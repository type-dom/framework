import { Watcher as WatcherClass } from '../../reactivity/watcher/watcher.class';
import { Observer } from '../../reactivity/observer/observer.class';

import { IJsonData, IJsonDataProp } from '../../interface';

export type IObserverCallback = (newValue: any, oldValue: any) => void;

export interface IObserver {
  callback: IObserverCallback;
  dependOn: string[]; // path string[]
}

export interface IObserverMap {
  [key: string]: IObserver[];
}

/**
 * 抽象类 Watcher 定义了对象属性变化的监听机制
 */
export abstract class Watcher {
  // 存储监听的路径及其对应的回调函数
  private observers: IObserverMap = {};

  /**
   * 开始监听对象的某个路径的变化
   *
   * @param obj 被监听的对象
   * @param path 监听的属性路径
   * @param callback 属性变化时的回调函数
   */
  watch(obj: IJsonData, path: string[], callback: IObserverCallback) {
    // // 将路径数组转换为字符串作为键
    // const key = path.join('.');
    // // 如果该路径没有被监听，则初始化其对应的回调函数数组
    // if (!this.observers[key]) {
    //   this.observers[key] = [];
    // }
    // // 将回调函数和依赖的路径添加到监听列表中
    // this.observers[key].push({ callback, dependOn: path });
    //
    // // 通过路径找到监听的属性
    // let current: IJsonDataProp = obj;
    // for (let i = 0; i < path.length - 1; i++) {
    //   current = (current as IJsonData)[path[i]];
    // }
    // const prop = path[path.length - 1];
    // let originalValue = (current as IJsonData)[prop];
    // // 如果监听的属性是数组，则为数组方法添加代理以实现监听
    // if (Array.isArray(originalValue)) {
    //   const arrayProto = Array.prototype as any;
    //   const arrayMethods = Object.create(arrayProto);
    //
    //   const original = [...originalValue];
    //   const methodsToOverride = [
    //     'push',
    //     'pop',
    //     'shift',
    //     'unshift',
    //     'splice',
    //     'sort',
    //     'reverse'
    //   ];
    //
    //   // 为指定的数组方法添加监听逻辑
    //   methodsToOverride.forEach(method => {
    //     const originalMethod = arrayProto[method];
    //     const that = this;
    //     arrayMethods[method] = function(...args: any[]) {
    //       const result = originalMethod.apply(this, args);
    //       that.notifyObservers(key, this, original);
    //       return result;
    //     };
    //   });
    //
    //   // 将原数组的方法替换为具有监听功能的方法
    //   Object.setPrototypeOf(originalValue, arrayMethods);
    // }
    //
    // // 通过定义属性的方式实现对属性值的监听
    // Object.defineProperty(current, prop, {
    //   configurable: true,
    //   enumerable: true,
    //   get: () => originalValue,
    //   set: (newValue) => {
    //     // 当属性值发生变化时，通知所有观察者
    //     if (originalValue !== newValue) {
    //       this.notifyObservers(key, newValue, originalValue);
    //       originalValue = newValue;
    //       (current as IJsonData)[prop] = newValue;
    //     }
    //   }
    // });
    new Observer(obj);
    new WatcherClass(obj, path.join('.'), callback);
  }

  /**
   * 通知所有观察者属性值的变化
   *
   * @param path 变化的属性路径
   * @param newValue 新的属性值
   * @param oldValue 旧的属性值
   */
  notifyObservers(path: string, newValue: IJsonDataProp, oldValue: IJsonDataProp) {
    const observers = this.observers[path];
    if (observers) {
      observers.forEach((observer) => {
        observer.callback(newValue, oldValue);
      });
    }
  }
}


//
// // 使用示例
// const reactiveSystem = new ReactiveSystem();
//
// const data = {
//   user: {
//     name: 'Alice',
//     age: 30,
//     hobbies: ['reading', 'coding']
//   }
// };
//
// // 监听 user.name 属性的变化
// reactiveSystem.watch(data, ['user', 'name'], (newValue, oldValue) => {
//   console.log(`Name changed from ${oldValue} to ${newValue}`);
// });
//
// // 监听 user.hobbies 数组的变化
// reactiveSystem.watch(data, ['user', 'hobbies'], (newValue, oldValue) => {
//   console.log(`Hobbies changed from ${oldValue} to ${newValue}`);
// });
//
// // 更改属性值
// data.user.name = 'Bob';
// data.user.hobbies.push('swimming');

// 输出:
// Name changed from Alice to Bob
// Hobbies changed from reading,coding to reading,coding,swimming
