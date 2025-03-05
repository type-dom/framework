import { MaybeRef, MaybeRefOrGetter, toRaw } from '@type-dom/signals';
import { AnyFn } from '@type-dom/utils';

/**
 * Get the value of value/ref/getter.
 */
export function toValue<T>(r?: MaybeRefOrGetter<T> | MaybeRef<T>[]): T | undefined | T[]{
  if (typeof r === 'function') {
    return (r as AnyFn)()
  } else if (r instanceof Array) {
    return r.map(i => toRaw(i) as T) ; // add by me
  } else {
    return toRaw(r) as T;
  }
}
// export function toValue<T>(r: MaybeRefOrGetter<T>): T {
//   return typeof r === 'function'
//     ? (r as AnyFn)()
//     : unref(r)
// }
/**
 * @deprecated use `toValue` instead
 */
export const resolveUnref = toValue;
