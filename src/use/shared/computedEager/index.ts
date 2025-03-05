// ported from https://dev.to/linusborg/vue-when-a-computed-property-can-be-the-wrong-tool-195j
// by @linusborg https://github.com/LinusBorg

// import type { Ref, WatchOptionsBase } from 'vue'
// import { readonly, shallowRef, watchEffect } from 'vue'

import { effect, readonly, signal, Ref, watch, WatchOptions, Signal } from '@type-dom/signals';

/**
 * Note: If you are using Vue 3.4+, you can straight use computed instead.
 * Because in Vue 3.4+, if computed new value does not change,
 * computed, effect, watch, watchEffect, render dependencies will not be triggered.
 * refer: https://github.com/vuejs/core/pull/5912
 *
 * @param fn effect function
 * @param options WatchOptionsBase
 * @returns readonly ref
 */
export function computedEager<T>(fn: () => T, options?: WatchOptions): Signal<T | undefined> {
  const result = signal<T>()

  effect(() => {
    result.set(fn())
  }
  //   {
  //   ...options,
  //   flush: options?.flush ?? 'sync',
  // }
  )

  return result
}

// alias
export { computedEager as eagerComputed }
