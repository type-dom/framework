import { signal } from '@type-dom/signals';
import { watch } from '../../reactivity';
import type { MaybeComputedElementRef } from '../unrefElement'
// import { tryOnMounted } from '@vueuse/shared'
// import { ref, watch } from 'vue'
import { unrefElement } from '../unrefElement'
import { useEventListener } from '../useEventListener'
import { useMutationObserver } from '../useMutationObserver'
import { useResizeObserver } from '../useResizeObserver'
import { tryOnMounted } from '../shared';

export interface UseElementBoundingOptions {
  /**
   * Reset values to 0 on component unmounted
   *
   * @default true
   */
  reset?: boolean

  /**
   * Listen to window resize event
   *
   * @default true
   */
  windowResize?: boolean
  /**
   * Listen to window scroll event
   *
   * @default true
   */
  windowScroll?: boolean

  /**
   * Immediately call update on component mounted
   *
   * @default true
   */
  immediate?: boolean

  /**
   * Timing to recalculate the bounding box
   *
   * Setting to `preview-frame` can be useful when using this together with something like {@link useBreakpoints}
   * and therefore the layout (which influences the bounding box of the observed element) is not updated on the current tick.
   *
   * @default 'sync'
   */
  updateTiming?: 'sync' | 'preview-frame'
}

/**
 * Reactive bounding box of an HTML element.
 *
 * @see https://vueuse.org/useElementBounding
 * @param target
 * @param options
 */
export function useElementBounding(
  target: MaybeComputedElementRef,
  options: UseElementBoundingOptions = {},
) {
  // console.error('useElementBounding . target is ', target);
  const {
    reset = true,
    windowResize = true,
    windowScroll = true,
    immediate = true,
    updateTiming = 'sync',
  } = options;

  const height = signal(0);
  const bottom = signal(0);
  const left = signal(0);
  const right = signal(0);
  const top = signal(0);
  const width = signal(0);
  const x = signal(0);
  const y = signal(0);

  function recalculate() {
    // console.error('recalculate . ');
    const el = unrefElement(target) as HTMLElement;
    // console.error('el is ', el);
    if (!el) {
      if (reset) {
        height.set(0);
        bottom.set(0);
        left.set(0);
        right.set(0);
        top.set(0);
        width.set(0);
        x.set(0);
        y.set(0);
      }
      return;
    }

    const rect = el.getBoundingClientRect();
    // console.error('rect.height is ', rect.height);
    height.set(rect.height);
    bottom.set(rect.bottom);
    left.set(rect.left);
    right.set(rect.right);
    top.set(rect.top);
    width.set(rect.width);
    x.set(rect.x);
    y.set(rect.y);
  }

  function update() {
    // console.error('updateRoot . opt is ', opt);
    if (updateTiming === 'sync') {
      recalculate();
    } else if (updateTiming === 'preview-frame') {
      requestAnimationFrame(() => recalculate());
    }
  }
  useResizeObserver(target, () => {
    // Uncaught ResizeObserver loop completed with undelivered notifications.
    // update
    requestAnimationFrame(update);
  });
  watch(
    () => unrefElement(target),
    (ele) => !ele && update()
  );
  // trigger by css or style
  useMutationObserver(target, update, {
    attributeFilter: ['style', 'class'],
  });

  if (windowScroll) {
    useEventListener('scroll', update, { capture: true, passive: true });
  }
  if (windowResize) {
    useEventListener('resize', update, { passive: true });
  }

  tryOnMounted(() => {
    if (immediate) update();
  });

  return {
    height,
    bottom,
    left,
    right,
    top,
    width,
    x,
    y,
    update,
  };
}

export type UseElementBoundingReturn = ReturnType<typeof useElementBounding>
