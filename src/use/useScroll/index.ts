// import type { MaybeRefOrGetter } from '@vueuse/shared'
import type { ConfigurableWindow } from '../_configurable'
// import { noop, tryOnMounted, useDebounceFn, useThrottleFn } from '@vueuse/shared'
// import { computed, reactive, ref, toValue } from 'vue'
import { defaultWindow } from '../_configurable'
import { unrefElement } from '../unrefElement'
import { useEventListener } from '../useEventListener'
import { computed, MaybeRefOrGetter, signal } from '@type-dom/signals';
import { noop } from '../utils';
import { toValue } from '../shared/toValue';
import { useDebounceFn } from '../shared/useDebounceFn';
import { useThrottleFn } from '../useThrottleFn';
import { tryOnMounted } from '../shared/tryOnMounted';


export interface UseScrollOptions extends ConfigurableWindow {
  /**
   * Throttle time for scroll event, it’s disabled by default.
   *
   * @default 0
   */
  throttle?: number

  /**
   * The check time when scrolling ends.
   * This configuration will be setting to (throttle + idle) when the `throttle` is configured.
   *
   * @default 200
   */
  idle?: number

  /**
   * Offset arrived states by x pixels
   *
   */
  offset?: {
    left?: number
    right?: number
    top?: number
    bottom?: number
  }

  /**
   * Trigger it when scrolling.
   *
   */
  onScroll?: (e: Event) => void

  /**
   * Trigger it when scrolling ends.
   *
   */
  onStop?: (e: Event) => void

  /**
   * Listener options for scroll event.
   *
   * @default {capture: false, passive: true}
   */
  eventListenerOptions?: boolean | AddEventListenerOptions

  /**
   * Optionally specify a scroll behavior of `auto` (default, not smooth scrolling) or
   * `smooth` (for smooth scrolling) which takes effect when changing the `x` or `y` refs.
   *
   * @default 'auto'
   */
  behavior?: MaybeRefOrGetter<ScrollBehavior>

  /**
   * On error callback
   *
   * Default log error to `console.error`
   */
  onError?: (error: unknown) => void
}

/**
 * We have to check if the scroll amount is close enough to some threshold in order to
 * more accurately calculate arrivedState. This is because scrollTop/scrollLeft are non-rounded
 * numbers, while scrollHeight/scrollWidth and clientHeight/clientWidth are rounded.
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#determine_if_an_element_has_been_totally_scrolled
 */
const ARRIVED_STATE_THRESHOLD_PIXELS = 1

/**
 * Reactive scroll.
 *
 * @see https://vueuse.org/useScroll
 * @param element
 * @param options
 */
export function useScroll(
  element: MaybeRefOrGetter<HTMLElement | SVGElement | Window | Document | null>,
  options: UseScrollOptions = {},
) {
  const {
    throttle = 0,
    idle = 200,
    onStop = noop,
    onScroll = noop,
    offset = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    eventListenerOptions = {
      capture: false,
      passive: true,
    },
    behavior = 'auto',
    window = defaultWindow,
    onError = (e) => { console.error(e) },
  } = options

  const internalX = signal(0)
  const internalY = signal(0)

  // Use a computed for x and y because we want to write the value to the refs
  // during a `scrollTo()` without firing additional `scrollTo()`s in the process.
  const x = computed(
    () => {
      return internalX.get()
    },
    (x) => {
      scrollTo(x, undefined)
    },
  )

  const y = computed(
    () => internalY.get(),
    (y) => {
      scrollTo(undefined, y)
    }
  )

  function scrollTo(_x: number | undefined, _y: number | undefined) {
    if (!window)
      return

    const _element = toValue(element)
    if (!_element)
      return

    (_element instanceof Document ? window.document.body : _element)?.scrollTo({
      top: toValue(_y) ?? y.get(),
      left: toValue(_x) ?? x.get(),
      behavior: toValue(behavior),
    })
    const scrollContainer
      = (_element as Window)?.document?.documentElement
      || (_element as Document)?.documentElement
      || (_element as Element)
    if (x != null)
      internalX.set(scrollContainer.scrollLeft)
    if (y != null)
      internalY.set(scrollContainer.scrollTop)
  }

  const isScrolling = signal(false)
  const arrivedState = ({
    left: true,
    right: false,
    top: true,
    bottom: false,
  })
  const directions = ({
    left: false,
    right: false,
    top: false,
    bottom: false,
  })

  const onScrollEnd = (e: Event) => {
    // dedupe if support native scrollend event
    if (!isScrolling.get())
      return

    isScrolling.set(false)
    directions.left = false
    directions.right = false
    directions.top = false
    directions.bottom = false
    onStop(e)
  }
  const onScrollEndDebounced = useDebounceFn(onScrollEnd, throttle + idle)

  const setArrivedState = (target: HTMLElement | SVGElement | Window | Document | null | undefined) => {
    if (!window)
      return

    const el: Element = (
      (target as Window)?.document?.documentElement
      || (target as Document)?.documentElement
      || unrefElement(target as HTMLElement | SVGElement)
    ) as Element

    const { display, flexDirection, direction } = getComputedStyle(el)
    const directionMultipler = direction === 'rtl' ? -1 : 1

    const scrollLeft = el.scrollLeft
    directions.left = scrollLeft < internalX.get()
    directions.right = scrollLeft > internalX.get()

    const left = (scrollLeft * directionMultipler) <= (offset.left || 0)
    const right = (scrollLeft * directionMultipler)
      + el.clientWidth >= el.scrollWidth
      - (offset.right || 0)
      - ARRIVED_STATE_THRESHOLD_PIXELS

    if (display === 'flex' && flexDirection === 'row-reverse') {
      arrivedState.left = right
      arrivedState.right = left
    }
    else {
      arrivedState.left = left
      arrivedState.right = right
    }

    internalX.set(scrollLeft)

    let scrollTop = el.scrollTop

    // patch for mobile compatible
    if (target === window.document && !scrollTop)
      scrollTop = window.document.body.scrollTop

    directions.top = scrollTop < internalY.get()
    directions.bottom = scrollTop > internalY.get()
    const top = scrollTop <= (offset.top || 0)
    const bottom = scrollTop
      + el.clientHeight >= el.scrollHeight
      - (offset.bottom || 0)
      - ARRIVED_STATE_THRESHOLD_PIXELS

    /**
     * reverse columns and rows behave exactly the other way around,
     * bottom is treated as top and top is treated as the negative version of bottom
     */
    if (display === 'flex' && flexDirection === 'column-reverse') {
      arrivedState.top = bottom
      arrivedState.bottom = top
    }
    else {
      arrivedState.top = top
      arrivedState.bottom = bottom
    }

    internalY.set(scrollTop)
  }

  const onScrollHandler = (e: Event) => {
    if (!window)
      return

    const eventTarget = (
      (e.target as Document).documentElement ?? e.target
    ) as HTMLElement

    setArrivedState(eventTarget)

    isScrolling.set(true)
    onScrollEndDebounced(e)
    onScroll(e)
  }

  useEventListener(
    element,
    'scroll',
    throttle ? useThrottleFn(onScrollHandler, throttle, true, false) : onScrollHandler,
    eventListenerOptions,
  )

  tryOnMounted(() => {
    try {
      const _element = toValue(element)
      if (!_element)
        return
      setArrivedState(_element)
    }
    catch (e) {
      onError(e)
    }
  })

  useEventListener(
    element,
    'scrollend',
    onScrollEnd,
    eventListenerOptions,
  )

  return {
    x,
    y,
    isScrolling,
    arrivedState,
    directions,
    measure() {
      const _element = toValue(element)

      if (window && _element)
        setArrivedState(_element)
    },
  }
}

export type UseScrollReturn = ReturnType<typeof useScroll>
