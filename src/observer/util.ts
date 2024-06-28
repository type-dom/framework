import { isArray, isPlainObject } from '@type-dom/utils';
// import { Dep } from './dep'
// import { arrayMethods } from './array'
// import {
//   hasChanged,
//   // def,
//   // warn,
//   hasOwn,
//   // hasProto,
//   isServerRendering
//   // hasChanged,
//   // noop
// } from '../util/index';
// import { TrackOpTypes, TriggerOpTypes } from '../../operations';
// import { Observer } from './observer';
// import { IJsonData, IObData } from '../../interface';
import { Dep } from './dep';
// import { observe } from './observe';
// import { isReadonly, isRef, TrackOpTypes, TriggerOpTypes } from '../../v3'


export const NO_INITIAL_VALUE = {};

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
export const shouldObserve = true;

// export function toggleObserving(value: boolean) {
//   shouldObserve = value
// }


declare const RefSymbol: unique symbol;

/**
 * @internal
 */
export const RefFlag = `__v_isRef`;

export interface Ref<T = any> {
  value: T;
  /**
   * Type differentiator only.
   * We need this to be in public d.ts but don't want it to show up in IDE
   * autocomplete, so we use a private Symbol instead.
   */
  [RefSymbol]: true;
  /**
   * @internal
   */
  dep?: Dep;
  /**
   * @internal
   */
  [RefFlag]: true;
}

export function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
export function isRef(r: any): r is Ref {
  return !!(r && (r as Ref).__v_isRef === true);
}


// export const enum ReactiveFlags {
//   SKIP = '__v_skip',
//   IS_READONLY = '__v_isReadonly',
//   IS_SHALLOW = '__v_isShallow',
//   RAW = '__v_raw'
// }

// export interface Target {
//   __ob__?: Observer
//   [ReactiveFlags.SKIP]?: boolean
//   [ReactiveFlags.IS_READONLY]?: boolean
//   [ReactiveFlags.IS_SHALLOW]?: boolean
//   [ReactiveFlags.RAW]?: any
// }

// export function isReadonly(value: unknown): boolean {
//   return !!(value && (value as Target).__v_isReadonly)
// }
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
// export function set<T>(array: T[], key: number, value: T): T
// export function set<T>(object: object, key: string | number, value: T): T
// export function set(
//   target: any[] | Record<string, any>,
//   key: any,
//   val: any
// ): any {
//
//   if (isReadonly(target)) {
//     return
//   }
//   const ob = (target as any).__ob__
//   if (isArray(target) && isValidArrayIndex(key)) {
//     target.length = Math.max(target.length, key)
//     target.splice(key, 1, val)
//     // when mocking for SSR, array methods are not hijacked
//     if (ob && !ob.shallow && ob.mock) {
//       observe(val) //, false, true)
//     }
//     return val
//   }
//   if (key in target && !(key in Object.prototype)) {
//     target[key] = val
//     return val
//   }
//   if ((target as any)._isVue || (ob && ob.vmCount)) {
//     return val
//   }
//   if (!ob) {
//     target[key] = val
//     return val
//   }
//   defineReactive(ob.value, key, val, undefined, ob.shallow, ob.mock)
//   ob.dep.notify()
//   return val
// }

/**
 * Delete a property and trigger change if necessary.
 */
// export function del<T>(array: T[], key: number): void
// export function del(object: object, key: string | number): void
// export function del(target: any[] | object, key: any) {
//   if (isArray(target) && isValidArrayIndex(key)) {
//     target.splice(key, 1)
//     return
//   }
//   const ob = (target as any).__ob__
//   if ((target as any)._isVue || (ob && ob.vmCount)) {
//     return
//   }
//   if (isReadonly(target)) {
//     return
//   }
//   if (!hasOwn(target, key)) {
//     return
//   }
//   delete target[key]
//   if (!ob) {
//     return
//   }
//   ob.dep.notify()
// }

