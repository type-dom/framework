import { MaybeRefOrGetter, watch } from '@type-dom/signals';

import type { MaybeElementRef } from '../unrefElement'
import { defaultWindow } from '../_configurable'
import { unrefElement } from '../unrefElement'
import { AnyFn, Arrayable, Fn, isObject, noop } from '../utils';
import { tryOnScopeDispose } from '../tryOnScopeDispose';
import { toValue } from '../toValue';

interface InferEventTarget<Events> {
  addEventListener: (event: Events, fn?: any, options?: any) => any
  removeEventListener: (event: Events, fn?: any, options?: any) => any
}

export type WindowEventName = keyof WindowEventMap
export type DocumentEventName = keyof DocumentEventMap

export interface GeneralEventListener<E = Event> {
  (evt: E): void
}

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 1: Omitted Window target
 *
 * @see https://vueuse.org/useEventListener
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<E extends keyof WindowEventMap>(
  event: Arrayable<E>,
  listener: Arrayable<(this: Window, ev: WindowEventMap[E]) => any>,
  options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 2: Explicitly Window target
 *
 * @see https://vueuse.org/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<E extends keyof WindowEventMap>(
  target: Window,
  event: Arrayable<E>,
  listener: Arrayable<(this: Window, ev: WindowEventMap[E]) => any>,
  options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 3: Explicitly Document target
 *
 * @see https://vueuse.org/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<E extends keyof DocumentEventMap>(
  target: DocumentOrShadowRoot,
  event: Arrayable<E>,
  listener: Arrayable<(this: Document, ev: DocumentEventMap[E]) => any>,
  options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 4: Explicitly HTMLElement target
 *
 * @see https://vueuse.org/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<E extends keyof HTMLElementEventMap>(
  target: MaybeRefOrGetter<HTMLElement | null | undefined>,
  event: Arrayable<E>,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[E]) => any,
  options?: boolean | AddEventListenerOptions
): () => void

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 5: Custom event target with event type infer
 *
 * @see https://vueuse.org/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<Names extends string, EventType = Event>(
  target: MaybeRefOrGetter<InferEventTarget<Names> | null | undefined>,
  event: Arrayable<Names>,
  listener: Arrayable<GeneralEventListener<EventType>>,
  options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 6: Custom event target fallback
 *
 * @see https://vueuse.org/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useEventListener<EventType = Event>(
  target: MaybeRefOrGetter<EventTarget | null | undefined>,
  event: Arrayable<string>,
  listener: Arrayable<GeneralEventListener<EventType>>,
  options?: MaybeRefOrGetter<boolean | AddEventListenerOptions>
): Fn

export function useEventListener(...args: any[]) {
  // console.warn('useEventListener . ');
  let target: MaybeRefOrGetter<EventTarget> | undefined
  let events: Arrayable<string>
  let listeners: Arrayable<AnyFn>
  let options: MaybeRefOrGetter<boolean | AddEventListenerOptions> | undefined

  if (typeof args[0] === 'string' || Array.isArray(args[0])) {
    [events, listeners, options] = args
    target = defaultWindow
  }
  else {
    [target, events, listeners, options] = args
  }

  if (!target) {
    return noop
  }

  if (!Array.isArray(events)) {
    events = [events]
  }
  if (!Array.isArray(listeners)) {
    listeners = [listeners]
  }

  const cleanups: AnyFn[] = []
  const cleanup = () => {
    cleanups.forEach(fn => fn())
    cleanups.length = 0
  }

  const register = (el: any, event: string, listener: any, options: any) => {
    el.addEventListener(event, listener, options)
    return () => el.removeEventListener(event, listener, options)
  }

  const stopWatch = watch(
    () => [unrefElement(target as unknown as MaybeElementRef), toValue(options)],
    ([el, options]) => {
      cleanup()
      if (!el)
        return

      // create a clone of options, to avoid it being changed reactively on removal
      const optionsClone = isObject(options) ? { ...options } : options
      cleanups.push(
        ...(events as string[]).flatMap((event) => {
          return (listeners as AnyFn[]).map(listener => register(el, event, listener, optionsClone))
        }),
      )
    },
    { immediate: true, flush: 'post' },
  )

  const stop = () => {
    stopWatch()
    cleanup()
  }

  tryOnScopeDispose(stop)

  return stop
}
