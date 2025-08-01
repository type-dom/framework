import { AnyFn } from '@type-dom/utils';
import { isArray } from '../../shared';
import { TypeProps } from '../type-node/type-node.interface';
import { NodeName } from '../enums';
import { IEmits, IEvent, IEvents } from './event-emitter.interface';

/**
 * 1.原生 DOM 元素 当 events, addEvents，原生 DOM 事件监听器。
 * 2.自定义组件 会优先使用 addEmits。
 * 若组件未声明 click 为自定义事件，并尝试将事件绑定到组件根 DOM 元素上（退化为原生事件监听）。
 */
export abstract class EventEmitter {
  /**
   * 存储事件名称与事件监听器数组的映射
   * key 事件名 value: callback[]  回调数组
   * 注：  Map是es6新特性，所以这里用它来代替数组可能会有兼容问题。
   *
   *  This is an Object containing Maps:
   *   { [event: string]: Map<listener: function, numTimesAdded: number> }
   *    We use a Map for O(1) insertion/deletion and because it can have functions as keys.
   *
   *    We keep track of numTimesAdded (the number of times it was added) because if you attach the same listener twice,
   *     we should actually call it twice for each emitted event.
   */
  // observers: Record<string, AnyFn[]>;
  eventObservers: Record<string, Map<AnyFn | undefined, IEvent>>;
  emitObservers: Record<string, Map<AnyFn | undefined, number>>;
  /**
   * 属性项
   */
  abstract props: TypeProps;
  // abstract nodeName: NodeName.TEXT | NodeName.FRAGMENT | string;
  abstract dom?:
    | HTMLElement
    | SVGElement
    | DocumentFragment
    | Text
    | Comment
    | null
    | undefined;

  constructor() {
    // this.observers = {};
    this.eventObservers = {};
    this.emitObservers = {};
  }

  getEventObserver(key: string) {
    return this.eventObservers[key];
  }

  /**
   * 批量添加事件监听器
   * @param emits 包含事件名称与监听器的映射对象
   * todo 与 events 合并；
   */
  addEmits(emits?: IEmits | string[]) {
    // 遍历事件映射，为每个事件名称添加监听器
    if (emits) {
      // 遍历事件映射，为每个事件名称添加监听器
      if (isArray(emits)) {
        emits.forEach((eventName) => {
          this.on(eventName, undefined, 'emit');
        });
      } else {
        Object.entries(emits).forEach(([eventName, listener]) => {
          this.on(eventName, listener, 'emit');
        });
      }
    }
  }

  /**
   * 只考虑组件自身的事件。
   * 添加事件监听器
   * @throws 如果监听器不是函数，抛出错误
   * @returns 返回this，允许链式调用
   * @param events  单个事件或多个事件, 以空格分割的事件名称
   * @param listener
   * @param type
   */
  on<T = Event>(events: string, listener?: AnyFn, type: 'emit' | 'event' = 'event') {
    // 确保监听器是一个函数
    // if (!listener) {
    //   return;
    // }
    // if (typeof listener !== 'function') {
    //   throw new Error('Listener must be a function');
    // }
    events.split(' ').forEach((event) => {
      // 如果事件名称不存在于映射中，则创建新Map
      if (type === 'event') {
        if (!this.eventObservers[event]) {
          this.eventObservers[event] = new Map();
        }
        const eventHandler = (evt?: Event) => {
          // this.off(event, listener); // 移除订阅者, listen only once time;
          listener?.(evt, this);
        };
        this.eventObservers[event].set(listener, eventHandler);
      } else if (type === 'emit') {
        if (!this.emitObservers[event]) {
          this.emitObservers[event] = new Map();
        }
        // const numListeners = this.observers[event].get(listener!) || 0;
        // // 将监听器添加到对应事件的Map中
        // this.observers[event].set(listener!, numListeners + 1);
        const numListeners = this.emitObservers[event].get(listener) || 0;
        // 将监听器添加到对应事件的Map中
        this.emitObservers[event].set(listener, numListeners + 1);
      } else {
        throw new Error('type must be "emit" or "event"');
      }
    });
  }

  /**
   * 添加一次性事件监听器，事件触发后自动移除监听器
   * @param eventName 事件名称
   * @param listener 事件监听器，一个函数
   * @returns 返回this，允许链式调用
   */
  once = (eventName: string, listener: AnyFn) => {
    // 创建一个包装后的监听器，触发后会自动移除自身
    const wrappedListener = (...args: any[]) => {
      this.off(eventName, wrappedListener);
      listener(...args);
    };
    // 将包装后的监听器添加到事件中
    this.on(eventName, wrappedListener);
    return this;
  };

  /**
   * Remove event listener
   * removes all callback when callback not specified
   * 移除事件监听器
   * @param event
   * @param listener 要移除的事件监听器
   * @returns 返回this，允许链式调用
   */
  off(event: string, listener?: AnyFn, _type: 'emit' | 'event' = 'event') {
    if (!this.eventObservers[event]) {
      return;
    }
    if (!listener) {
      if (this.dom) {
        // 不是 fragment组件
        for (const observer of this.eventObservers[event]) {
          // console.log(`observer : ${observer.name}`);
          if (this.dom)
            this.dom.removeEventListener(
              event as keyof GlobalEventHandlersEventMap,
              observer[1]
            );
        }
      }
      delete this.eventObservers[event];
      return;
    }
    // todo 移除订阅者
    if (this.dom) {
      // 不是 fragment组件
      const eventHandler = this.eventObservers[event].get(listener);
      if (!eventHandler) return;
      this.dom.removeEventListener(
        event as keyof GlobalEventHandlersEventMap,
        eventHandler
      );
    }
    this.eventObservers[event].delete(listener);
  }

  /**
   * Emit event
   * 触发指定事件，执行所有对应监听器
   * @param event
   * @param args 传递给监听器的参数
   */
  emit = (event: string, ...args: any[]) => {
    if (this.emitObservers[event]) {
      const listeners = this.emitObservers[event]; // 监听器数组
      // todo INPUT, CHANGE
      // if (event === UPDATE_MODEL_EVENT || event === 'change' || event === 'input') {
      //   console.warn('emit event is ', event);
      for (const listener of listeners) {
        // todo 要保证验证监听器在第一个。
        const result = listener[0]?.(...args);
        if (result === false) {
          // 验证器验证失败
          //   todo 是打断监听还是清除监听器
          break;
        }
      }
    }
    // else { // 降级为原生监听 todo input password example toggle show password, loop error;
    //   const listeners = this.eventObservers[event]; // 监听器数组
    //   if (!listeners) return;
    //   // todo INPUT, CHANGE
    //   // if (event === UPDATE_MODEL_EVENT || event === 'change' || event === 'input') {
    //   //   console.warn('emit event is ', event);
    //   for (const listener of listeners) { // Map 严格按照插入顺序执行
    //     // todo 要保证验证监听器在第一个。
    //     const result = listener[1](...args);
    //     if (result === false) {
    //       // 验证器验证失败
    //       //   todo 是打断监听还是清除监听器
    //       break;
    //     }
    //   }
    // }

    // if (this.observers['*']) {
    //   const listeners = this.observers['*'];
    //   listeners.forEach((listener, numTimesAdded) => {
    //     listener(...args);
    //   });
    // }
  };

  /**
   * 检查是否存在指定事件的监听器
   * @param eventName 事件名称
   * @returns 如果存在监听器，返回true；否则返回false
   */
  hasListeners(eventName: string) {
    // 检查事件名称是否存在监听器数组，并且数组长度大于0
    return Boolean(
      this.eventObservers[eventName] &&
        this.eventObservers[eventName].size > 0
    );
  }

  /**
   * 添加事件集合
   * Fragment 不可使用；
   */
  addEvents(events?: Partial<IEvents>) {
    if (this.props.nodeName === NodeName.FRAGMENT || !events) {
      console.error('This is fragment or events is undefined . ');
      return;
    }
    for (const key in events) {
      const eventFun = events[key as keyof IEvents];
      if (eventFun) {
        this.on(key, eventFun);
      }
    }
  }

  // 只考虑组件自身的事件。
  // addEvent<T extends Event>(key: string, handleEvent: AnyFn) {
  //   // todo 这样移除监听时怎么找监听器。
  //   //     转换后，监听器会被反复添加的。
  //   //    之前为什么要转一下？
  //   // const eventHandler = (evt: T) => {
  //   //   handleEvent(evt, this);
  //   // };
  //   // if (key === 'click' && this.dom instanceof HTMLButtonElement) {
  //   //   console.warn('addEvent  handleEvent is ', handleEvent);
  //   // }
  //   this.on<T>(key, handleEvent);
  // }

  /**
   * 设置一些事件监听器，添加到dom上
   * Fragment 不可以使用。
   * @param events
   */
  setEvents(events: Partial<IEvents>) {
    if (this.props.nodeName === NodeName.FRAGMENT) {
      console.error('fragment cannot add events . ');
      return;
    }
    for (const key in events) {
      const eventFun = events[key as keyof IEvents];
      if (eventFun) {
        this.setEvent(key, eventFun as IEvent);
      }
    }
  }

  // 添加一个事件监听器，并添加到dom上
  // todo
  // 绑定触摸开始事件，并设置 passive 选项, 优化， 如何传第三个参数监听；
  //   element.addEventListener('touchstart', handleTouchStart, { passive: true });
  setEvent<T extends Event>(key: string, handleEvent: IEvent<T>) {
    this.on(key, handleEvent);
    if (this.dom)
      this.dom.addEventListener(
        key as keyof GlobalEventHandlersEventMap,
        this.eventObservers[key].get(handleEvent)!
      );
  }

  // 清除移除所有事件监听器
  clearEvents(): void {
    // for (const key in this.eventObservers) {
    //   this.off(key);
    // }
    for (const key in this.emitObservers) {
      // 移除该事件的所有监听器； 移除了 emit方法就没有触发的回调了。
      this.off(key);
    }
  }

  /**
   * 初始化事件钩子
   * setConfig 时，dom可能还没有创建；
   * 这里是不区分是 addEmits or addEvents方式添加的监听器的；那么为什么还要区分 addEmits or addEvents？
   * todo 如果是自定义事件是怎么监听的？还是不促发？
   * todo 与 setEvents是否重复
   */
  listenEvents(): void {
    // this.clearEvents(); // todo 为啥要移除
    if (!this.dom) {
      return;
    }
    if (this.eventObservers) {
      // dom 监听事件要挂载到真实dom上。
      // if (this.dom instanceof HTMLButtonElement) {
      //   console.warn('this.eventObservers is ', this.eventObservers);
      // }
      for (const key in this.eventObservers) {
        const cloned = this.eventObservers[key];
        cloned.forEach((observer) => {
          if (this.dom) {
            this.dom.removeEventListener(key, observer); // 防止重复监听
            this.dom.addEventListener(
              key as keyof GlobalEventHandlersEventMap,
              observer
            );
          }
        });
      }
    }
  }
}
