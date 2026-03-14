import { cloneDeep, } from 'lodash-es';
import { computed, effect, setActiveSub } from '@type-dom/signals';
import {
  isArray,
  isFunction,
  isMap,
  isSet,
  isObject,
  isPlainObject,
  AnyFn
  // shallowEqual,
} from '@type-dom/utils';
import { isTypeNode } from '../core'; // error  '../core/vnode'; cannot access TypeNode before initialization
import { MaybeRef, Ref, isRef } from './ref';
import { warn } from './warning.js';

// These errors were transferred from `packages/runtime-core/src/errorHandling.ts`
// to @vue/reactivity to allow co-location with the moved base watch logic, hence
// it is essential to keep these values unchanged.
export enum WatchErrorCodes {
  WATCH_GETTER = 2,
  WATCH_CALLBACK,
  WATCH_CLEANUP,
}

export type WatchSource<T = any> = Ref<T> | (() => T | undefined) | (MaybeRef<T> | (() => T | undefined))[];
export type WatchCallback<T = any> = (newValue: T, oldValue: T) => void;
export type WatchStopHandle = () => void;

export type WatchScheduler = (job: () => void, isFirstRun: boolean) => void

const cleanupMap: WeakMap<any, (() => void)[]> = new WeakMap()
let activeWatcher: any | undefined = undefined

export interface WatchOptions<T = unknown, Immediate = boolean> {
  /**
   * 功能：控制是否在侦听器创建时立即执行回调函数
   * 默认值：false
   * 效果：
   * 设置为 true 时，侦听器会在初始化时立即触发一次回调
   * 设置为 false 时，只有当被侦听的数据发生变化时才会触发回调
   */
  immediate?: Immediate;
  /**
   * 功能：控制是否深度侦听对象内部值的变化
   * 默认值：false
   * 效果：
   * 设置为 true 时，会递归侦听对象内部所有嵌套属性的变化
   * 设置为 false 时，只侦听对象引用的变化，不关心内部属性变化
   */
  deep?: boolean; // add by me
  /**
   * 功能：控制侦听器是否只执行一次
   * 默认值：false
   * 效果：
   * true：回调执行一次后自动停止侦听
   * false：持续侦听直到手动停止
   */
  once?: boolean;
  onWarn?: (msg: string, ...args: any[]) => void
  /**
   * @internal
   */
  // augmentJob?: (job: (...args: any[]) => void) => void
  /**
   * @internal
   */
  call?: (
    fn: AnyFn | AnyFn[],
    type: WatchErrorCodes,
    args?: unknown[],
  ) => void
  equals?: Immediate extends true
    ? (a: T, b: T | undefined) => boolean
    : (a: T, b: T) => boolean;   // relate deep
  onError?: (error: unknown) => void;
  scheduler?: (fn: () => void) => void;
  /**
   * 功能：控制回调函数的刷新时机
   * 可选值：
   * pre（默认）：在组件更新前执行
   * post：在组件更新后执行 after DOM update scheduler
   * sync：同步执行，数据变化时立即触发
   */
  flush?: 'pre' | 'post' | 'sync';
}

/**
 * Registers a cleanup callback on the current active effect. This
 * registered cleanup callback will be invoked right before the
 * associated effect re-runs.
 *
 * @param cleanupFn - The callback function to attach to the effect's cleanup.
 * @param failSilently - if `true`, will not throw warning when called without
 * an active effect.
 * @param owner - The effect that this cleanup function should be attached to.
 * By default, the current active effect.
 */
export function onWatcherCleanup(
  cleanupFn: () => void,
  failSilently = false,
  owner: any | undefined = activeWatcher,
): void {
  if (owner) {
    let cleanups = cleanupMap.get(owner)
    if (!cleanups) cleanupMap.set(owner, (cleanups = []))
    cleanups.push(cleanupFn)
  } else { // if (__DEV__ && !failSilently) {
    warn(
      `onWatcherCleanup() was called when there was no active watcher` +
      ` to associate with.`,
    )
  }
}

export function watch<T>(
  source: WatchSource<T> | undefined,
  effectFn?: WatchCallback<T> | null,
  options: WatchOptions = {}
): WatchStopHandle {
  const {
    // scheduler = (fn) => fn(),
    // Object.is 是一个更严格的比较方法，适合需要精确判断值是否完全相等的场景。
    equals = Object.is,
    onError,
    once = false,
    immediate = false,
    deep = false,
  } = options;

  const warnInvalidSource = (s: unknown) => {
    (options.onWarn || warn)(
      `Invalid watch source: `,
      s,
      `A watch source can only be a getter/effect function, a ref, ` +
      `a reactive object, or an array of these types.`,
    )
  }

  // const reactiveGetter = (source: object) => {
  //   // traverse will happen in wrapped getter below
  //   if (deep) return source
  //   // for `deep: false | 0` or shallow reactive, only traverse root-level properties
  //   if (isRef(source) || deep === false || deep === 0)
  //     return traverse(source, 1)
  //   // for `deep: undefined` on a reactive object, deeply traverse all properties
  //   return traverse(source)
  // }

  let dataFn: () => T | undefined;
  if (isRef(source)) {
    dataFn = () => {
      if (isArray(source.get())) {
        return (source.get() as any[]).map(item => {
          if (isRef(item)) {
            return item.get();
          } else if (isFunction(item)) {
            return item();
          } else {
            return item;
          }
        }) as T
      }
      return source.get();
    };
  } else if (isArray(source)) {
    dataFn = () => source.map(s => {
      if (isRef(s)) {
        return s.get();
      } else if (isFunction(s)) {
        return s();
      } else {
        return s;
      }
    }) as T;
  } else if (isFunction(source)) {
    dataFn = source;
  } else {
    warnInvalidSource(source);
    // throw new Error('Invalid watch source');
  }

  let prevValue: T | undefined;
  if (isArray(source)) {
    prevValue = Array(source.length).fill(undefined) as T;
  }
  let version = 0;

  const tracked = computed(() => {
    try {
      return dataFn();
    } catch (error) {
      untracked(() => onError?.(error));
      return prevValue;
    }
  });

  const dispose = effect(() => {
    // console.warn('watch effect . ');
    const current = tracked.get();
    // console.warn('current is ', current);
    if (!immediate && !version) {
      prevValue = (
        isTypeNode(current)
          ? current
          : isArray(current)
            ? [...current]
            : isObject(current)
              ? { ...current }
              : current) as T;
    } else if (immediate && version === 0) {
      // prevValue = current as T;
    }
    // first evaluation: if not fireImmediately, just record the current value and skip
    if (version === 0) {
      if (!immediate) {
        prevValue = current;
        version++;
        return;
      }
      // if fireImmediately is true, we fall through to trigger the effect with prevValue possibly undefined
    }

    // immediate: true, current: undefined 时， 要执行一下dataFn
    // 当 current 未定义、immediate 为 true 且 version 为 0 时继续执行
    const shouldProceed = immediate && version === 0;
    version++;
    if (!shouldProceed) {
      // console.error('reaction current  preValue is ', current, prevValue);
      // todo
      if (equals(current, prevValue!)) {
        if (!deep) {
          //    应该在 set() 时触发 trigger()，而不是set后，在触发 trigger()， 这样watch 就会监听到新旧值是一样的。
          if (isRef(current)) {
            return;
          } else if (isTypeNode(current)) {
            return;
          } else if (isArray(current)) {
          //
          } else if (isObject(current)) {
          //
          } else {
            return;
          }
        }
      }
    }

    // todo cloneDeep 需要考虑 Signals/TypeNode
    // const oldValue = prevValue instanceof TypeNode ? prevValue : cloneDeep(prevValue) as T;
    const oldValue = (
      isTypeNode(prevValue)
        ? prevValue
        : isRef(prevValue)
          ? prevValue
          : isArray(prevValue)
            ? [...prevValue]
            : isObject(prevValue)
              ? { ...prevValue } // 浅拷贝
              : prevValue
    ) as T;
    if (deep) {
      // prevValue = cloneDeep(current); // todo loop 需要考虑 Signals/TypeNode
      prevValue = (
        isRef(current)
          ? current
          : isTypeNode(current)
            ? current
            : isArray(current)
              ? [...current]
              : isPlainObject(current)
                ? cloneDeep(current) // 深拷贝
                : current
      ) as T;
    } else {
      prevValue = (
        isArray(current)
          ? [...current]
          : isTypeNode(current)
            ? current
            : isObject(current)
              ? { ...current } // 浅拷贝
              : current
      ) as T;
    }

    let scheduler: (fn: () => void) => void;
    if (options.scheduler) {
      scheduler = options.scheduler;
    } else if (options.flush === 'post') {
      scheduler = queueMicrotask;
    } else {
      scheduler = fn => fn();
    }
    untracked(() =>
      scheduler(() => {
        try {
          if (immediate && version === 1) {
            effectFn?.(current!, oldValue);
          } else {
            if (version === 1 && immediate !== true) {
              return;
            }
            if (once && dispose) {
              if (immediate && version > 1) {
                dispose();
                return;
              } else if (!immediate && version > 2) {
                dispose();
                return;
              }
            }
            // if (deep) {
            //   // notify 时 current oldValue 都是一样的。
            //   // if (isEqual(current, oldValue)) {
            //   //   return;
            //   // }
            // } else {
            //   if (immediate && current === undefined && oldValue === undefined) {
            //     // nothing
            //   } else
            //   if (shallowEqual(current, oldValue)) {
            //     return;
            //   }
            // }
            effectFn?.(current!, oldValue);
          }
        } catch (error) {
          onError?.(error);
        } finally {
          // if (once) {
          //   if (immediate && version > 1) dispose();
          //   else if (!immediate && version > 0) dispose();
          // }
          // After the scheduled effect runs, re-evaluate the tracked value (untracked)
          // so that synchronous updates performed by the effect are reflected in prevValue.
          try {
            prevValue = untracked(() => tracked.get());
          } catch (e) {
            // swallow any errors from re-evaluating tracked
          }
        }
      })
    );
  });

  return dispose;
}

export function untracked<T>(callback: () => T): T {
  const currentSub = setActiveSub(undefined);
  try {
    return callback();
  } finally {
    setActiveSub(currentSub);
  }
}

export function traverse(
  value: any,
  depth = Infinity,
  seen?: Set<unknown>,
): unknown {
  if (depth <= 0 || !isObject(value)) {
    return value
  }

  seen = seen || new Set()
  if (seen.has(value)) {
    return value
  }
  seen.add(value)
  depth--
  if (isRef(value)) {
    traverse(value.get(), depth, seen)
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen)
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v: any) => {
      traverse(v, depth, seen)
    })
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key as keyof typeof value], depth, seen)
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key as keyof typeof value], depth, seen)
      }
    }
  }
  return value
}
