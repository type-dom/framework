import { unref, MaybeRefOrGetter } from '../../../reactivity';
import { isFunction } from '../../../shared/general';

/**
 * Normalizes values / refs / getters to values.
 * This is similar to {@link unref()}, except that it also normalizes getters.
 * If the argument is a getter, it will be invoked and its return value will
 * be returned.
 *
 * @example
 * ```js
 * toValue(1) // 1
 * toValue(ref(1)) // 1
 * toValue(() => 1) // 1
 * ```
 *
 * @param source - A getter, an existing ref, or a non-function value.
 * @see {@link https://vuejs.org/api/reactivity-utilities.html#tovalue}
 */
export function toValue<T>(source: MaybeRefOrGetter<T>): T | undefined {
  return isFunction(source) ? source() : unref(source)
}
/**
 * Get the value of value/ref/getter.
 */
// export function toValue<T>(r?: MaybeRefOrGetter<T>): T {
//   return typeof r === 'function'
//     ? (r as AnyFn)()
//     : unref(r)
// }

/**
 * @deprecated use `toValue` instead
 */
export const resolveUnref = toValue
