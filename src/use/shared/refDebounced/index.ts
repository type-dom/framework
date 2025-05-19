// import type { Ref } from 'vue'
// import type { DebounceFilterOptions, MaybeRefOrGetter } from '../utils'
// import { ref, watch } from 'vue'
// import { useDebounceFn } from '../useDebounceFn'

import { MaybeRefOrGetter, Ref, signal, watch } from '@type-dom/signals';
import { DebounceFilterOptions } from '../../utils/filters';
import { useDebounceFn } from '../useDebounceFn';

/**
 * Debounce updates of a ref.
 *
 * @return A new debounced ref.
 */
export function refDebounced<T>(value: Ref<T>, ms: MaybeRefOrGetter<number> = 200, options: DebounceFilterOptions = {}): Readonly<Ref<T>> {
  const debounced = signal(value.get() as T) as Ref<T>

  const updater = useDebounceFn(() => {
    debounced.set(value.get()!);
  }, ms, options)

  watch(() => value.get(), () => updater())

  return debounced
}

// alias
export {
  refDebounced as useDebounce,
  refDebounced as debouncedRef,
}
