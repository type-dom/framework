import { isFunction, noop, SimpleSet as Set } from '@type-dom/utils';
import { IJsonData, IJsonDataProp } from '../interface';
import {
  isBoolean,
  isNumber,
  isObject,
  isString,
  isArray
} from '@type-dom/utils';
import { Dep, DepTarget, popTarget, pushTarget } from './dep';
import { parsePath } from '../util';
import { DebuggerOptions } from '../debug';
// import Dep from './dep';
let uid = 0;

/**
 * @internal
 */
export interface WatcherOptions extends DebuggerOptions {
  deep?: boolean;
  user?: boolean;
  lazy?: boolean;
  sync?: boolean;
  // before?: Function
}

export class Watcher implements DepTarget {
  // target 目标对象
  // expression 属性名
  // callback 回调函数
  // value 属性的值
  id: number;
  private deep: boolean;
  private target: IJsonData;
  private getter: ((obj: IJsonData) => IJsonDataProp) | typeof noop;
  private callback: (val: IJsonDataProp, oldValue: IJsonDataProp) => void;
  private value?: IJsonDataProp;
  private active: boolean;
  private newDepIds: Set;
  deps: Array<Dep>;
  private newDeps: Array<Dep>;
  private depIds: Set;
  post: boolean;
  noRecurse?: boolean;

  constructor(
    target: IJsonData,
    expression: string | (() => any),
    callback: (val: IJsonDataProp, oldValue: IJsonDataProp) => void,
    options?: WatcherOptions
  ) {
    this.id = ++uid; // uid for batching
    this.active = true;
    this.post = false;
    this.deps = [];
    this.newDeps = [];
    this.depIds = new Set();
    this.newDepIds = new Set();
    this.target = target;
    // options
    if (options) {
      this.deep = !!options.deep;
      // this.user = !!options.user
      // this.lazy = !!options.lazy
      // this.sync = !!options.sync
      // this.before = options.before
      // if (__DEV__) {
      //   this.onTrack = options.onTrack
      //   this.onTrigger = options.onTrigger
      // }
    } else {
      this.deep = /*this.user = this.lazy = this.sync =*/ false;
    }
    // parsePath 为一个高阶函数
    if (isFunction(expression)) {
      this.getter = expression;
    } else {
      this.getter = parsePath(expression) || noop;
      // if (!this.getter) {
      //   this.getter = noop;
      //   // __DEV__ &&
      //   // warn(
      //   //   `Failed watching path: "${expOrFn}" ` +
      //   //   'Watcher only accepts simple dot-delimited paths. ' +
      //   //   'For full control, use a function instead.',
      //   //   vm
      //   // )
      // }
    }
    this.deep = false;
    this.callback = callback;
    // get为我们之后要写的获取值的方法
    this.value = this.get() as IJsonDataProp;
  }

  // 获取当前的值，并将它更新，然后 return 返回
  get() {
    pushTarget(this);
    // 进入依赖收集阶段，将 Dep.target 设为 Watcher 实例本身
    Dep.target = this;

    // 当前对象
    const obj = this.target;
    let value;
    // 当对象不再使用的时候，我们需要将它清空
    try {
      value = this.getter(obj);
    } catch (e: any) {
      console.log('catch e is ', e);
      throw e;
    } finally {
      Dep.target = undefined;
      popTarget();
      this.cleanupDeps();
    }
    // this.value = value;
    return value;
  }

  addDep(dep: Dep) {
    const id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  }

  /**
   * Clean up for dependency collection.
   */
  cleanupDeps() {
    let i = this.deps.length;
    while (i--) {
      const dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
    let tmp: Set | Dep[] = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  }

  // Dep发过来的通知，当前变量更新了，我们返回一个更新之后的回调函数
  update() {
    // this.value 由于还没触发更新，所以此时是旧的值
    const oldValue = this.value;
    // 通过我们的 getter 方法，直接获取最新的值
    const newValue = this.get() as IJsonDataProp;
    // 将新值和旧值返回给 callback 回调函数
    this.callback(newValue, oldValue);
  }

  /**
   * Depend on all deps collected by this watcher.
   */
  depend() {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  }
}
