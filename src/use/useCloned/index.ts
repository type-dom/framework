// import type { MaybeRefOrGetter } from '@vueuse/shared'
// import type { Ref, WatchOptions } from 'vue'
// import { isRef, ref, toValue, watch } from 'vue'

import { isRef, MaybeRefOrGetter, Ref, signal, watch, WatchOptions, WatchSource } from '@type-dom/signals';
import { toValue } from '../shared/toValue/index';

export interface UseClonedOptions<T = any> extends WatchOptions {
  /**
   * Custom clone function.
   *
   * By default, it use `JSON.parse(JSON.stringify(value))` to clone.
   */
  clone?: (source: T) => T

  /**
   * Manually sync the ref
   *
   * @default false
   */
  manual?: boolean
}

export interface UseClonedReturn<T> {
  /**
   * Cloned ref
   */
  cloned: Ref<T>
  /**
   * Ref indicates whether the cloned data is modified
   */
  isModified: Ref<boolean>
  /**
   * Sync cloned data with source manually
   */
  sync: () => void
}

export type CloneFn<F, T = F> = (x: F) => T

export function cloneFnJSON<T>(source: T): T {
  return JSON.parse(JSON.stringify(source))
}

export function useCloned<T>(
  source: MaybeRefOrGetter<T>,
  options: UseClonedOptions = {},
): UseClonedReturn<T> {
  const cloned = signal({} as T) as Ref<T>
  const isModified = signal<boolean>(false)
  let _lastSync = false

  const {
    manual,
    clone = cloneFnJSON,
    // watch options
    deep = true,
    immediate = true,
  } = options

  watch(cloned, () => {
    if (_lastSync) {
      _lastSync = false
      return
    }
    isModified.set(true)
  }, {
    deep: true,
    flush: 'sync',
  })

  function sync() {
    _lastSync = true
    isModified.set(false)

    cloned.set(clone(toValue(source)))
  }

  if (!manual && (isRef(source) || typeof source === 'function')) {
    watch(source as WatchSource<any>, sync, {
      ...options,
      deep,
      immediate,
    })
  }
  else {
    sync()
  }

  return { cloned, isModified, sync }
}
