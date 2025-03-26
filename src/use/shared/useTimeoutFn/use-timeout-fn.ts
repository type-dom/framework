// import { readonly, ref } from 'vue-demi'
// import type { AnyFn, MaybeRefOrGetter, Stoppable } from '../utils'
// import { toValue } from '../toValue'
// import { tryOnScopeDispose } from '../tryOnScopeDispose'
// import { isClient } from '../utils'

import { AnyFn, isClient } from '@type-dom/utils';
import { Stoppable } from '../../../interface';
import { tryOnScopeDispose } from '../tryOnScopeDispose';

export interface UseTimeoutFnOptions {
  /**
   * Start the timer immediate after calling this function
   *
   * @default true
   */
  immediate?: boolean;
}

/**
 * Wrapper for `setTimeout` with controls.
 *
 * @param cb
 * @param interval
 * @param options
 */
export function useTimeoutFn<CallbackFn extends AnyFn>(
  cb: CallbackFn,
  interval: number,
  options?: UseTimeoutFnOptions
): Stoppable<Parameters<CallbackFn> | []> {
  const {
    immediate = true
  } = options || {};

  let isPending = false;

  let timer: ReturnType<typeof setTimeout> | null = null;

  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function stop() {
    isPending = false;
    clear();
  }

  function start(...args: []) {
    clear();
    isPending = true;
    timer = setTimeout(() => {
      isPending = false;
      timer = null;

      cb(...args);
    }, interval);
  }

  // console.log('immediate is ', immediate);
  if (immediate) {
    isPending = true;
    if (isClient) {
      start();
    }
  }

  tryOnScopeDispose(stop)

  return {
    isPending: isPending,
    start,
    stop
  };
}
