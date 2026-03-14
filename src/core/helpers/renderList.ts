// import type { VNode, VNodeChild } from '../vnode'
// import {
//   isReactive,
//   isReadonly,
//   isShallow,
//   shallowReadArray,
//   toReactive,
//   toReadonly,
// } from '@vue/reactivity'
import { isArray, isObject, isString } from '@type-dom/utils';
import { warn } from '../warning'
import { TypeNode } from '../abstracts';

/**
 * v-for string
 * @private
 */
export function renderList(
  source: string,
  renderItem: (value: string, index: number) => (TypeNode | string | number)
): (TypeNode | number | string)[];

/**
 * v-for number
 */
export function renderList(
  source: number,
  renderItem: (value: number, index: number) => (TypeNode | string | number)
): (TypeNode | number | string)[];

/**
 * v-for array
 */
export function renderList<T>(
  source: T[],
  renderItem: (value: T, index: number) => (TypeNode | string | number)
): (TypeNode | number | string)[];

/**
 * v-for iterable
 */
export function renderList<T>(
  source: Iterable<T>,
  renderItem: (value: T, index: number) => (TypeNode | string | number)
): (TypeNode | number | string)[];

/**
 * v-for object
 */
export function renderList<T>(
  source: T,
  renderItem: <K extends keyof T>(
    value: T[K],
    key: string,
    index: number
  ) => (TypeNode | string)
): (TypeNode | number | string)[];

/**
 * Actual implementation
 */
export function renderList(
  source: any,
  renderItem: (...args: any[]) => (TypeNode | string | number),
  cache?: any[],
  index?: number
): (TypeNode | number | string)[] {
  let ret: (TypeNode | string | number)[];
  const cached = (cache && cache[index!]) as TypeNode[] | undefined;
  const sourceIsArray = isArray(source);

  if (sourceIsArray || isString(source)) {
    // const sourceIsReactiveArray = sourceIsArray && isReactive(source)
    // let needsWrap = false
    // let isReadonlySource = false
    // if (sourceIsReactiveArray) {
    //   needsWrap = !isShallow(source)
    //   isReadonlySource = isReadonly(source)
    //   source = shallowReadArray(source)
    // }
    ret = Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      // ret[i] = renderItem(
      //   needsWrap
      //     ? isReadonlySource
      //       ? toReadonly(toReactive(source[i]))
      //       : toReactive(source[i])
      //     : source[i],
      //   i,
      //   undefined,
      //   cached && cached[i],
      // )
      ret[i] = renderItem(source[i], i, undefined, cached && cached[i]);
    }
  } else if (typeof source === 'number') {
    if (/*__DEV__ && */!Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`)
    }
    ret = Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, undefined, cached && cached[i]);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator as any]) {
      ret = Array.from(source as Iterable<any>, (item, i) =>
        renderItem(item, i, undefined, cached && cached[i])
      );
    } else {
      const keys = Object.keys(source);
      ret = Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }

  if (cache) {
    cache[index!] = ret;
  }
  return ret;
}
