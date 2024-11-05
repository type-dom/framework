import { TypeHtml } from '../core/type-html/type-html.abstract';

export interface UseElementBoundingOptions {
  /**
   * Reset values to 0 on component unmounted
   *
   * @default true
   */
  reset?: boolean;

  /**
   * Listen to window resize event
   *
   * @default true
   */
  windowResize?: boolean;
  /**
   * Listen to window scroll event
   *
   * @default true
   */
  windowScroll?: boolean;

  /**
   * Immediately call update on component mounted
   *
   * @default true
   */
  immediate?: boolean;
}

/**
 * Reactive bounding box of an HTML element.
 *
 * @see https://vueuse.org/useElementBounding
 * @param target
 */
export function useElementBounding(
  target: TypeHtml,
  options: UseElementBoundingOptions = {}
) {
  const {
    reset = true,
    windowResize = true,
    windowScroll = true,
    immediate = true
  } = options;

  let height = 0;
  let bottom = 0;
  let left = 0;
  let right = 0;
  let top = 0;
  let width = 0;
  let x = 0;
  let y = 0;

  function update() {
    const el = target.dom;

    if (!el) {
      if (reset) {
        height = 0;
        bottom = 0;
        left = 0;
        right = 0;
        top = 0;
        width = 0;
        x = 0;
        y = 0;
      }
      return;
    }

    const rect = el.getBoundingClientRect();

    height = rect.height;
    bottom = rect.bottom;
    left = rect.left;
    right = rect.right;
    top = rect.top;
    width = rect.width;
    x = rect.x;
    y = rect.y;
  }

  // useResizeObserver(target, update)
  // watch(() => unrefElement(target), ele => !ele && update())
  // // trigger by css or style
  // useMutationObserver(target, update, {
  //   attributeFilter: ['style', 'class'],
  // })
  //
  if (windowScroll) {
    // useEventListener('scroll', update, { capture: true, passive: true })
  }
  if (windowResize) {
    // useEventListener('resize', update, { passive: true })
  }

  //
  // tryOnMounted(() => {
  //   if (immediate)
  //     update()
  // })

  return {
    height,
    bottom,
    left,
    right,
    top,
    width,
    x,
    y,
    update
  };
}

export type UseElementBoundingReturn = ReturnType<typeof useElementBounding>;
