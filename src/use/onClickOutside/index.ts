import { isIOS, noop } from '@type-dom/utils';
import { Fn } from '../../interface';
import { TypeNode } from '../../core/type-node/type-node.abstract';
import { TypeElement } from '../../core/type-element/type-element.abstract';
import { useEventListener } from '../useEventListener/index';
import { ConfigurableWindow, defaultWindow } from '../_configurable';



export interface OnClickOutsideOptions extends ConfigurableWindow {
  /**
   * List of elements that should not trigger the event.
   */
  ignore?: (string | TypeNode)[];// MaybeRefOrGetter<(MaybeElementRef | string)[]>
  /**
   * Use capturing phase for internal event listener.
   * @default true
   */
  capture?: boolean
  /**
   * Run handler function if focus moves to an iframe.
   * @default false
   */
  detectIframe?: boolean
}

export type OnClickOutsideHandler<T extends { detectIframe: OnClickOutsideOptions['detectIframe'] } = { detectIframe: false }> = (evt: T['detectIframe'] extends true ? PointerEvent | FocusEvent : PointerEvent) => void

let _iOSWorkaround = false

/**
 * Listen for clicks outside of an element.
 *
 * @see https://vueuse.org/onClickOutside
 * @param target
 * @param handler
 * @param options
 */
export function onClickOutside<T extends OnClickOutsideOptions>(
  target: TypeNode,
  handler: OnClickOutsideHandler<{ detectIframe: T['detectIframe'] }>,
  options: T = {} as T,
) {
  // console.warn('onClickOutside . ');
  const { window = defaultWindow, ignore = [], capture = true, detectIframe = false } = options

  if (!window)
    return noop

  // Fixes: https://github.com/vueuse/vueuse/issues/1520
  // How it works: https://stackoverflow.com/a/39712411
  if (isIOS && !_iOSWorkaround) {
    _iOSWorkaround = true
    Array.from(window.document.body.children)
      .forEach(el => el.addEventListener('click', noop))
    window.document.documentElement.addEventListener('click', noop)
  }

  let shouldListen = true

  const shouldIgnore = (event: PointerEvent) => {
    return ignore?.some((target) => {
      if (typeof target === 'string') {
        return Array.from(window.document.querySelectorAll(target))
          .some(el => el === event.target || event.composedPath().includes(el))
      } else {
        const el = target.dom;
        return el && (event.target === el || event.composedPath().includes(el))
      }
    })
  }

  /**
   * Determines if the given target has multiple root elements.
   * Referenced from: https://github.com/vuejs/test-utils/blob/ccb460be55f9f6be05ab708500a41ec8adf6f4bc/src/vue-wrapper.ts#L21
   */
  function hasMultipleRoots(target: TypeNode): boolean {
    const vm = target;
    // return vm && vm.$.subTree.shapeFlag === 16
    return vm && !!vm.childNodes;
  }

  function checkMultipleRoots(target: TypeNode, event: PointerEvent): boolean {
    const vm = target;
    // const children = vm.$.subTree && vm.$.subTree.children
    const children = vm.children;

    if (children == null || !Array.isArray(children))
      return false

    // @ts-expect-error should be VNode
    return children.some((child: VNode) => child.el === event.target || event.composedPath().includes(child.el))
  }

  const listener = (event: PointerEvent) => {
    const el = target.dom;

    if (event.target == null)
      return

    // todo 作用是什么？？？
    // if (!(el instanceof Element) && hasMultipleRoots(target) && checkMultipleRoots(target, event))
    //   return

    if (!el || el === event.target || event.composedPath().includes(el))
      return

    if (el.contains(event.target as Node)) return;

    if (event.detail === 0)
      shouldListen = !shouldIgnore(event)

    if (!shouldListen) {
      shouldListen = true
      return
    }

    handler(event)
  }

  let isProcessingClick = false

  const cleanup = [
    useEventListener(window, 'click', (event: PointerEvent) => {
      if (!isProcessingClick) {
        isProcessingClick = true
        setTimeout(() => {
          isProcessingClick = false
        }, 0)
        listener(event)
      }
    }, { passive: true, capture }),
    useEventListener(window, 'pointerdown', (e) => {
      const el = target.dom;
      shouldListen = !shouldIgnore(e) && !!(el && !e.composedPath().includes(el))
    }, { passive: true }),
    detectIframe && useEventListener(window, 'blur', (event) => {
      setTimeout(() => {
        const el = target.dom;
        if (
          window.document.activeElement?.tagName === 'IFRAME'
          && !el?.contains(window.document.activeElement)
        ) {
          handler(event as any)
        }
      }, 0)
    }),
  ].filter(Boolean) as Fn[]

  const stop = () => cleanup.forEach(fn => fn());
  if (target instanceof TypeElement) {
    target.onUnmounted(() => stop());
  }
  return stop
}
