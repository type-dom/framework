// 下面是Vue3的源码
import { config } from '../config';
import { DebuggerOptions, DebuggerEventExtraInfo } from '../debug';
import { Watcher } from './watcher';
//
let uid = 0;
//
const pendingCleanupDeps: Dep[] = [];

export const cleanupDeps = () => {
  for (let i = 0; i < pendingCleanupDeps.length; i++) {
    const dep = pendingCleanupDeps[i];
    dep.subs = dep.subs.filter(s => s);
    dep._pending = false;
  }
  pendingCleanupDeps.length = 0;
};


/**
 * @internal
 */
export interface DepTarget extends DebuggerOptions {
  id: number;

  addDep(dep: Dep): void;

  update(): void;
}

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 * @internal
 */
export class Dep {
  static target?: DepTarget | null;
  id: number;
  subs: Array<DepTarget | null>;
  // pending subs cleanup
  _pending = false;

  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  addSub(sub: DepTarget) {
    this.subs.push(sub);
  }

  removeSub(sub: DepTarget) {
    // #12696 deps with massive amount of subscribers are extremely slow to
    // clean up in Chromium
    // to workaround this, we unset the sub for now, and clear them on
    // next scheduler flush.
    this.subs[this.subs.indexOf(sub)] = null;
    if (!this._pending) {
      this._pending = true;
      pendingCleanupDeps.push(this);
    }
  }

  depend(info?: DebuggerEventExtraInfo) {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify(info?: DebuggerEventExtraInfo) {
    // stabilize the subscriber list first
    const subs = this.subs.filter(s => s) as DepTarget[];
    if (/*__DEV__ && */!config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id);
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      const sub = subs[i];
      if (/*__DEV__ && */info) {
        sub.onTrigger &&
        sub.onTrigger({
          effect: subs[i],
          ...info
        })
      }
      sub.update();
    }
  }
}

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
const targetStack: Array<DepTarget | undefined> = [];

export function pushTarget(target?: DepTarget) {
  targetStack.push(target);
  Dep.target = target;
}

export function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

//
// // 下面是手搓的代码
// import { Watcher } from './watcher';
//
// export class Dep {
//   private subs: Watcher[];
//   static target?: Watcher;
//
//   constructor() {
//     // 用数组存储自己的订阅者   subs 是 subscribes 订阅者的意思
//     // 这个数组里放的是 Watcher 的实例
//     this.subs = [];
//   }
//
//   // 添加依赖
//   depend() {
//     // 判断当前是否有需要监听的目标,Dep.target 会被 Wacher 赋值
//     if (Dep.target) {
//       // 将 Watcher 实例添加进 subs
//       this.subs.push(Dep.target);
//     }
//   }
//
//   // 通知所有订阅者
//   notify() {
//     // 浅克隆一份
//     const subs = this.subs.slice();
//     // 遍历
//     for (let i = 0, l = subs.length; i < l; i++) {
//       // 逐个更新
//       subs[i].update();
//     }
//   }
// }
