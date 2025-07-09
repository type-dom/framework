export { batchEffect } from './batchEffect.js';
export *  from './watch.js';
// export { watchO } from './watch.back.js';
// export { reaction } from './reaction.js';
export * from './ref.js';
// export type { MaybeRef, Ref, IfAny, MaybeRefOrGetter, ToRef, ToRefs, ToSignal, ToSignals  } from './ref.js';

/**
 * Marks an object so that it will never be converted to a proxy. Returns the
 * object itself.
 *
 * @example
 * ```js
 * const foo = markRaw({})
 * console.log(isReactive(reactive(foo))) // false
 *
 * // also works when nested inside other reactive objects
 * const bar = reactive({ foo })
 * console.log(isReactive(bar.foo)) // false
 * ```
 *
 * **Warning:** `markRaw()` together with the shallow APIs such as
 * {@link shallowReactive()} allow you to selectively opt-out of the default
 * deep reactive/readonly conversion and embed raw, non-proxied objects in your
 * state graph.
 *
 * @param value - The object to be marked as "raw".
 * @see {@link https://vuejs.org/api/reactivity-advanced.html#markraw}
 */
// export function markRaw<T extends object>(value: T): Raw<T> {
//   if (!hasOwn(value, ReactiveFlags.SKIP) && Object.isExtensible(value)) {
//     def(value, ReactiveFlags.SKIP, true)
//   }
//   return value
// }
