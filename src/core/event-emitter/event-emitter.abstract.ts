import { AnyFn } from '@type-dom/utils';
import { TypeElement } from '../type-element/type-element.abstract';
import { TypeProps } from '../type-node/type-node.interface';
import { NodeName } from '../enums';
import { IEmits, IEvent, IEvents } from './event-emitter.interface';

export abstract class EventEmitter {
  /**
   * 存储事件名称与事件监听器数组的映射
   * key 事件名 value: callback[]  回调数组
   * 注：  Map是es6新特性，所以这里用它来代替数组可能会有兼容问题。
   *
   */
  observers: Record<string, AnyFn[]>;
  /**
   * 属性项
   */
  abstract props: TypeProps;
  // abstract nodeName: NodeName.TEXT | NodeName.FRAGMENT | string;
  abstract dom?: HTMLElement | SVGElement | DocumentFragment | Text | null | undefined;

  constructor() {
    // This is an Object containing Maps:
    //
    // { [event: string]: Map<listener: function, numTimesAdded: number> }
    //
    // We use a Map for O(1) insertion/deletion and because it can have functions as keys.
    //
    // We keep track of numTimesAdded (the number of times it was added) because if you attach the same listener twice,
    // we should actually call it twice for each emitted event.
    this.observers = {};
  }

  getObserver(key: string) {
    return this.observers[key];
  }

  /**
   * 批量添加事件监听器
   * @param emits 包含事件名称与监听器的映射对象
   * todo 与 events 合并；
   */
  addEmits(emits?: IEmits) {
    // 遍历事件映射，为每个事件名称添加监听器
    emits && Object.entries(emits).forEach(([eventName, listener]) => {
      this.on(eventName, listener);
    });
  }

  /**
   * 只考虑组件自身的事件。
   * 添加事件监听器
   * @throws 如果监听器不是函数，抛出错误
   * @returns 返回this，允许链式调用
   * @param events  单个事件或多个事件
   * @param listener
   */
  on(events: string, listener?: AnyFn) {
    // 确保监听器是一个函数
    if (!listener) {
      return;
    }
    if (typeof listener !== 'function') {
      throw new Error('Listener must be a function');
    }
    events.split(' ').forEach((event) => {
      // 如果事件名称不存在于映射中，则创建新Map
      if (!this.observers[event]) {
        this.observers[event] = [];
      }
      // const numListeners = this.observers[event].get(listener!) || 0;
      // // 将监听器添加到对应事件的Map中
      // this.observers[event].set(listener!, numListeners + 1);
      // todo 是否要过滤相同的监听器 ？？？
      this.observers[event].push(listener);
    });
  }

  /**
   * 添加一次性事件监听器，事件触发后自动移除监听器
   * @param eventName 事件名称
   * @param listener 事件监听器，一个函数
   * @returns 返回this，允许链式调用
   */
  once = (eventName: string, listener: AnyFn)=> {
    // 创建一个包装后的监听器，触发后会自动移除自身
    const wrappedListener = (...args: any[]) => {
      this.off(eventName, wrappedListener);
      listener(...args);
    };
    // 将包装后的监听器添加到事件中
    this.on(eventName, wrappedListener);
    return this;
  }

  /**
   * Remove event listener
   * removes all callback when callback not specified
   * 移除事件监听器
   * @param event
   * @param listener 要移除的事件监听器
   * @returns 返回this，允许链式调用
   */
  off(event: string, listener?: AnyFn) {
    if (!this.observers[event]) {
      return;
    }
    if (!listener) {
      if (this.dom) { // 不是 fragment组件
        for (const observer of this.observers[event]) {
          // console.log(`observer : ${observer.name}`);
          this.dom && this.dom.removeEventListener(event as keyof GlobalEventHandlersEventMap, observer);
        }
      }
      delete this.observers[event];
      return;
    }
    // todo 移除订阅者
    if (this.dom) { // 不是 fragment组件
      this.dom.removeEventListener(event as keyof GlobalEventHandlersEventMap, listener);
    }
    const index = this.observers[event].indexOf(listener);
    if (index !== -1) {
      this.observers[event].splice(index, 1);
    }
  }

  /**
   * Emit event
   * 触发指定事件，执行所有对应监听器
   * @param event
   * @param args 传递给监听器的参数
   */
  emit = (event: string, ...args: any[]) => {
    if (this.observers[event]) {
      const listeners = this.observers[event]; // 监听器数组
      // todo INPUT, CHANGE
      // if (event === 'update:modelValue' || event === 'change' || event === 'input') {
      //   console.warn('emit event is ', event);
        for (const listener of listeners) {
          // todo 要保证验证监听器在第一个。
          const result = listener(...args);
          if ( result === false) { // 验证器验证失败
          //   todo 是打断监听还是清除监听器
            break;
          }
        }
      // } else {
      //   listeners.forEach((listener) => {
      //     listener(...args);
      //   })
      // }
    }

    // if (this.observers['*']) {
    //   const listeners = this.observers['*'];
    //   listeners.forEach((listener, numTimesAdded) => {
    //     listener(...args);
    //   });
    // }
  }

  /**
   * 检查是否存在指定事件的监听器
   * @param eventName 事件名称
   * @returns 如果存在监听器，返回true；否则返回false
   */
  hasListeners(eventName: string) {
    // 检查事件名称是否存在监听器数组，并且数组长度大于0
    return Boolean(
      this.observers[eventName] && this.observers[eventName].length > 0
    );
  }

  /**
   * 添加事件集合
   */
  addEvents(events?: Partial<IEvents>) {
    if (this.props.nodeName === NodeName.FRAGMENT || !events) {
      // console.log('This is fragment or events is undefined . ');
      return;
    }
    for (const key in events) {
      const eventFun = events?.[key as keyof IEvents];
      if (eventFun) {
        this.addEvent(key, eventFun);
      }
    }
  }

  // 只考虑组件自身的事件。
  addEvent<T extends Event>(key: string, handleEvent: AnyFn) {
    // todo 这样移除监听时怎么找监听器。
    const eventHandler = (evt: T) => {
      handleEvent(evt, this);
    };
    this.on(key, eventHandler);
  }

  // 设置一些事件监听器，添加到dom上
  setEvents(events: Partial<IEvents>) {
    if (this.props.nodeName === NodeName.FRAGMENT) {
      // console.log('fragment cannot add events . ');
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
    const eventHandler = (evt: Event) => {
      handleEvent(evt as T, this as unknown as TypeElement);
    };
    this.on(key, eventHandler);
    this.dom && this.dom.addEventListener(key as keyof GlobalEventHandlersEventMap, eventHandler);
  }

  // 清除移除所有事件监听器
  clearEvents(): void {
    for (const key in this.observers) {
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
    if (this.observers) {
      // dom 监听事件要挂载到真实dom上。
      for (const key in this.observers) {
        const cloned =this.observers[key];
        cloned.forEach((observer) => {
          this.dom && this.dom.addEventListener(key as keyof GlobalEventHandlersEventMap, observer);
        });
      }
    }
  }

}
