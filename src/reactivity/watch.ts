import { computed, effect, setCurrentSub } from '@type-dom/signals';
import { isFunction, isMap, isSet, isArray, isObject, isPlainObject } from '@type-dom/utils';
import { MaybeRef, Ref, isRef } from '../reactivity/index';
import { warn } from './warning.js';

export type WatchSource<T = any> = Ref<T> | (() => T | undefined) | (MaybeRef<T> | (() => T | undefined))[];
export type WatchCallback<T> = (newValue: T, oldValue?: T) => void;
export type WatchStopHandle = () => void;

export interface WatchOptions<T = unknown, Immediate = boolean> {
  immediate?: Immediate;
  deep?: boolean; // add by me
  once?: boolean;
  onWarn?: (msg: string, ...args: any[]) => void
  /**
   * @internal
   */
  // augmentJob?: (job: (...args: any[]) => void) => void
  /**
   * @internal
   */
  // call?: (
  //   fn: AnyFn | AnyFn[],
  //   type: WatchErrorCodes,
  //   args?: unknown[],
  // ) => void
  equals?: Immediate extends true
    ? (a: T, b: T | undefined) => boolean
    : (a: T, b: T) => boolean;   // relate deep
  onError?: (error: unknown) => void;
  scheduler?: (fn: () => void) => void;
  flush?: 'pre' | 'post' | 'sync'; // post = after DOM update  scheduler
}

export function watch<T>(
  source: WatchSource<T> | undefined,
  effectFn: WatchCallback<T>,
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

  // const equals = Object.is;
  let dataFn: () => T | undefined;
  if (isRef(source)) {
    dataFn = () => source.get()
  } else if (isArray(source)) {
    dataFn = () => source.map(s => {
      if (isRef(s)) {
        return s.get();
      } else if (isFunction(s)) {
        return s();
      } else {
        warnInvalidSource(s);
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
  let version = 0;

  const tracked = computed(() => {
    try {
      return dataFn();
    } catch (error) {
      untracked(() => onError?.(error));
      return prevValue!;
    }
  });

  const dispose = effect(() => {
    // console.warn('watch effect . ');
    const current = tracked.get();
    if (!immediate && !version) {
      prevValue = current;
    }
    version++;
    // immediate: true, current: undefined 时， 要执行一下dataFn
    // 当 current 未定义、immediate 为 true 且 version 为 0 时继续执行
    const shouldProceed = current === undefined && immediate && version === 0;
    if (!shouldProceed) {
      // console.error('reaction current  preValue is ', current, prevValue);
      // todo
      if (equals(current, prevValue!)) {
        if (!deep) {
          // if (equals(current, prevValue)) {
          // console.warn('current equals prevValue');
          // }
          return;
        }
      }
    }
    const oldValue = prevValue;
    prevValue = current;
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
          effectFn(current!, oldValue);
        } catch (error) {
          onError?.(error);
        } finally {
          if (once) {
            if (immediate && version > 1) dispose();
            else if (!immediate && version > 0) dispose();
          }
        }
      })
    );
  });

  return dispose;
}

export function untracked<T>(callback: () => T): T {
  const currentSub = setCurrentSub(undefined);
  try {
    return callback();
  } finally {
    setCurrentSub(currentSub);
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
    traverse(value.value, depth, seen)
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
