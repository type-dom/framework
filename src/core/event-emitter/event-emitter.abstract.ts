import { AnyFn } from '../../interface';
import { TypeElement } from '../type-element/type-element.abstract';
import { Defer } from '../defer/defer';
import { IEmits, IEvent, IEvents } from './event-emitter.interface';

export abstract class EventEmitter extends Defer {
  /**
   * 存储事件名称与事件监听器数组的映射
   * key 事件名 value: callback[]  回调数组
   * @private
   */
  observers: Record<string, Map<AnyFn, number>>;
  abstract nodeName: '#text' | 'fragment' | string | undefined;
  abstract dom?: HTMLElement | SVGElement | Text | undefined;
  constructor() {
    super();
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
    if (typeof listener !== 'function') {
      throw new Error('Listener must be a function');
    }
    events.split(' ').forEach((event) => {
      // 如果事件名称不存在于映射中，则创建新Map
      if (!this.observers[event]) {
        this.observers[event] = new Map();
      }
      const numListeners = this.observers[event].get(listener!) || 0;
      // 将监听器添加到对应事件的Map中
      this.observers[event].set(listener!, numListeners + 1);
    });
    return this;
  }

  /**
   * 添加一次性事件监听器，事件触发后自动移除监听器
   * @param eventName 事件名称
   * @param listener 事件监听器，一个函数
   * @returns 返回this，允许链式调用
   */
  once(eventName: string, listener: AnyFn) {
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
        for (const observer of this.observers[event].keys()) {
          console.log(`observer : ${observer.name}`);
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
    this.observers[event].delete(listener);
  }

  /**
   * Emit event
   * 触发指定事件，执行所有对应监听器
   * @param event
   * @param args 传递给监听器的参数
   */
  emit(event: string, ...args: any[]): void {
    if (this.observers[event]) {
      const cloned = Array.from(this.observers[event].entries());
      cloned.forEach(([observer, numTimesAdded]) => {
        for (let i = 0; i < numTimesAdded; i++) {
          observer(...args);
        }
      });
    }

    if (this.observers['*']) {
      const cloned = Array.from(this.observers['*'].entries());
      cloned.forEach(([observer, numTimesAdded]) => {
        for (let i = 0; i < numTimesAdded; i++) {
          observer.apply(observer, [event, ...args]);
        }
      });
    }
  }

  /**
   * 检查是否存在指定事件的监听器
   * @param eventName 事件名称
   * @returns 如果存在监听器，返回true；否则返回false
   */
  hasListeners(eventName: string) {
    // 检查事件名称是否存在监听器数组，并且数组长度大于0
    return Boolean(
      this.observers[eventName] && Array.from(this.observers[eventName].entries()).length > 0
    );
  }

  /**
   * 添加事件集合
   */
  addEvents(events?: Partial<IEvents>) {
    if (this.nodeName === 'fragment' || !events) {
      console.log('This is fragment or events is undefined . ');
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
    const eventHandler = (evt: T) => {
      handleEvent(evt, this);
    };
    this.on(key, eventHandler);
  }

  // 设置一些事件监听器，添加到dom上
  setEvents(events: Partial<IEvents>) {
    if (this.nodeName === 'fragment') {
      console.log('fragment cannot add events . ');
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
}
