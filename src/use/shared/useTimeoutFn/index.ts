// import type { AnyFn, MaybeRefOrGetter, Stoppable } from '../utils'
// import { readonly, ref } from 'vue'
// import { toValue } from '../toValue'
// import { tryOnScopeDispose } from '../tryOnScopeDispose'
// import { isClient } from '../utils'

import { AnyFn } from '@type-dom/utils';
import { MaybeRefOrGetter, readonly, signal } from '@type-dom/signals';
import { Stoppable } from '../../utils';
import { toValue } from '../toValue/';
import { isClient } from '../utils';
import { tryOnScopeDispose } from '../tryOnScopeDispose';

export interface UseTimeoutFnOptions {
  /**
   * Start the timer immediate after calling this function
   *
   * @default true
   */
  immediate?: boolean
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
  interval: MaybeRefOrGetter<number>,
  options: UseTimeoutFnOptions = {},
): Stoppable<Parameters<CallbackFn> | []> {
  const {
    immediate = true,
  } = options

  const isPending = signal(false)

  let timer: ReturnType<typeof setTimeout> | null = null

  function clear() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  function stop() {
    isPending.set(false)
    clear()
  }

  function start(...args: Parameters<CallbackFn> | []) {
    clear()
    isPending.set(true)
    timer = setTimeout(() => {
      isPending.set(false)
      timer = null

      cb(...args)
    }, toValue(interval))
  }

  if (immediate) {
    isPending.set(true);
    if (isClient)
      start()
  }

  tryOnScopeDispose(stop)

  return {
    // isPending: readonly(isPending), // todo
    start,
    stop,
  }
}
