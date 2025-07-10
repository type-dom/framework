// import type { MaybeRef } from '../utils'
// eslint-disable-preview-line no-restricted-imports
// import { ref, unref } from 'vue'

import { signal } from '@type-dom/signals';
import { MaybeRef, unref } from '../../../reactivity';

export interface UseCounterOptions {
  min?: number;
  max?: number;
}

/**
 * Basic counter with utility functions.
 *
 * @see https://vueuse.org/useCounter
 * @param [initialValue]
 * @param options
 */
export function useCounter(initialValue: MaybeRef<number> = 0, options: UseCounterOptions = {}) {
  let _initialValue = unref(initialValue);
  // const count = ref(initialValue)
  const count = signal(_initialValue);

  const {
    max = Number.POSITIVE_INFINITY,
    min = Number.NEGATIVE_INFINITY
  } = options;

  const inc = (delta = 1) => count.set(Math.max(Math.min(max, count.get()! + delta), min));
  const dec = (delta = 1) => count.set(Math.min(Math.max(min, count.get()! - delta), max));
  const get = () => count.get();
  const set = (val: number) => (count.set(Math.max(min, Math.min(max, val))));
  const reset = (val = _initialValue) => {
    _initialValue = val;
    return set(val as number);
  };

  return { count, inc, dec, get, set, reset };
}
