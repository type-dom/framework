import { AnyFn, IEvent, IEvents, TypeElement } from '@type-dom/framework';

export class Events {
  private el: TypeElement;
  private events: { [propName: string]: AnyFn[] | undefined; };
  constructor(el: TypeElement) {
    this.el = el;
    this.events = {};
  }

  get(key: string) {
    return this.events[key];
  }

  /**
   * 批量添加事件监听器
   * @param emits 包含事件名称与监听器的映射对象
   * todo 与 events 合并；
   */
  addEmits(emits: Record<string, AnyFn>) {
    // 遍历事件映射，为每个事件名称添加监听器
    Object.entries(emits).forEach(([eventName, listener]) => {
      this.on(eventName, listener);
    });
  }

  /**
   * 添加事件
   */
  addEvents(events: Partial<IEvents>) {
    if (this.el.nodeName === 'fragment') {
      console.log('fragment cannot add events . ');
      return;
    }
    for (const key in events) {
      const eventFun = events[key as keyof IEvents];
      if (eventFun) {
        this.on(key, eventFun as IEvent);
      }
    }
  }

  /**
   * 只考虑组件自身的事件。
   * 添加事件监听器
   * @param key
   * @param handleEvent
   * @throws 如果监听器不是函数，抛出错误
   * @returns 返回this，允许链式调用
   */
  on<T extends Event>(key: string, handleEvent: IEvent<T>) {
    // 确保监听器是一个函数
    if (typeof handleEvent !== 'function') {
      throw new Error('Listener must be a function');
    }
    // 如果事件名称不存在于映射中，则初始化为空数组
    if (this.events[key] === undefined) {
      this.events[key] = [];
    }
    const eventHandler = (evt: T) => {
      handleEvent(evt, this.el);
    };
    // 将监听器添加到对应事件的数组中
    this.events[key]?.push(eventHandler);
    return this;
  }

  // 添加一个事件监听器，并添加到dom上
  set<T extends Event>(key: string, handleEvent: IEvent<T>) {
    // 确保监听器是一个函数
    if (typeof handleEvent !== 'function') {
      throw new Error('Listener must be a function');
    }
    if (this.events[key] === undefined) {
      this.events[key] = [];
    }
    const eventHandler = (evt: Event) => {
      handleEvent(evt as T, this.el);
    };
    this.events[key]?.push(eventHandler);
    this.el.dom!.addEventListener(key as keyof ElementEventMap, eventHandler);
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
   * 移除事件监听器
   * @param key 事件名称
   * @param listener 要移除的事件监听器
   * @returns 返回this，允许链式调用
   */
  off(key: string, listener?: AnyFn) {
    console.error('off .');
    // 如果事件名称不存在，直接返回
    if (!this.events[key]) {
      return this;
    }
    if (!listener) {
      this.events[key]?.map((item) => {
        if (this.el.dom) {
          this.el.dom!.removeEventListener(key as keyof GlobalEventHandlersEventMap, item);
        } else {
          console.warn('off dom is undefined . ');
        }
      });
      // 如果没有指定监听器，则移除该事件的所有监听器
      delete this.events[key];
      return this;
    }
    this.events[key]?.map((item, index: number) => {
      if (item === listener) {
        this.events[key]!.splice(index, 1);
        if (this.el.dom) {
          this.el.dom.removeEventListener(key as keyof GlobalEventHandlersEventMap, item);
        } else {
          console.warn('off dom is undefined . ');
        }
      }
    });
    return this;
  }

  /**
   * 触发指定事件，执行所有对应监听器
   * @param eventName 事件名称
   * @param args 传递给监听器的参数
   * @returns 返回this，允许链式调用
   */
  emit(eventName: string, ...args: any[]) {
    // 获取事件的监听器数组，如果存在则遍历执行每个监听器
    const listeners = this.events[eventName];
    if (listeners) {
      listeners.forEach((listener) => {
        if (this.el.dom) {
          // dom 事件触发不需要 emit 方法。
        } else {
          listener(...args);
        }
      });
    }
    return this;
  }

  /**
   * 检查是否存在指定事件的监听器
   * @param eventName 事件名称
   * @returns 如果存在监听器，返回true；否则返回false
   */
  hasListeners(eventName: string) {
    // 检查事件名称是否存在监听器数组，并且数组长度大于0
    return Boolean(
      this.events?.[eventName] && this.events[eventName]?.length > 0
    );
  }

  // 设置一个事件监听器，添加到dom上
  setEvents(events: Partial<IEvents>) {
    if (this.el.nodeName === 'fragment') {
      console.log('fragment cannot add events . ');
      return;
    }
    for (const key in events) {
      const eventFun = events[key as keyof IEvents];
      if (eventFun) {
        this.set(key, eventFun as IEvent);
      }
    }
  }

  // 清除移除所有事件监听器
  clear(): void {
    for (const key in this.events) {
      // 移除该事件的所有监听器； 移除了 emit方法就没有触发的回调了。
      if (this.el.dom) {
        this.events[key]?.map((item) => {
          this.el.dom!.removeEventListener(key as keyof ElementEventMap, item);
        });
        this.events[key] = [];
      }
      delete this.events[key];
    }
  }
}
