import { AnyFn } from '../interface';
import { Watcher } from './watcher.abstract';

/**
 * 发布订阅者模式
 * 抽象类EventEmitter定义了事件触发器的基本行为，允许注册、触发和移除事件监听器
 */
export abstract class EventEmitter extends Watcher {
  // 存储事件名称与事件监听器数组的映射
  // key 事件名 value: callback[]  回调数组
  private events: Record<string, AnyFn[]>;

  constructor() {
    super();
    // 初始化时，事件映射为空对象
    this.events = {};
  }

  /**
   * 批量添加事件监听器
   * @param emits 包含事件名称与监听器的映射对象
   */
  addEmits(emits: Record<string, AnyFn>) {
    // 遍历事件映射，为每个事件名称添加监听器
    Object.entries(emits).forEach(([eventName, listener]) => {
      this.on(eventName, listener);
    });
  }

  /**
   * 添加事件监听器
   * @param eventName 自定义事件名称
   * @param listener 事件监听器，一个函数
   * @throws 如果监听器不是函数，抛出错误
   * @returns 返回this，允许链式调用
   */
  on(eventName: string, listener: AnyFn) {
    // 确保监听器是一个函数
    if (typeof listener !== 'function') {
      throw new Error('Listener must be a function');
    }
    // 如果事件名称不存在于映射中，则初始化为空数组
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    // 将监听器添加到对应事件的数组中
    this.events[eventName].push(listener);
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
   * 移除事件监听器
   * @param eventName 事件名称
   * @param listener 要移除的事件监听器
   * @returns 返回this，允许链式调用
   */
  off(eventName: string, listener: AnyFn) {
    // 如果事件名称不存在，直接返回
    if (!this.events[eventName]) return this;
    if (!listener) {
      // 如果没有指定监听器，则移除该事件的所有监听器
      delete this.events[eventName];
      return this;
    }
    // 过滤掉指定的监听器，更新事件监听器数组
    this.events[eventName] = this.events[eventName].filter(
      existingListener => existingListener !== listener
    );
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
        listener(...args);
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
    return Boolean(this.events[eventName] && this.events[eventName].length > 0);
  }
}

//
// // 使用示例
// const eventEmitter = new EventEmits();
//
// // 添加监听器
// eventEmitter.on('message', (msg) => console.log(`Received message: ${msg}`));
// eventEmitter.once('onceMessage', (msg) => console.log(`Received one-time message: ${msg}`));
//
// // 触发事件
// eventEmitter.emit('message', 'Hello, world!');
// eventEmitter.emit('onceMessage', 'This is a one-time message.');
// eventEmitter.emit('onceMessage', 'This will not be heard.');

// 输出结果:
// Received message: Hello, world!
// Received one-time message: This is a one-time message.
