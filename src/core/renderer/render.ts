import { TypeNode } from '../type-node/type-node.abstract';
import { flushPostFlushCbs, flushPreFlushCbs } from '../scheduler';
import { unmount } from './unmount';
// import { mountDom } from '../helpers/mountDom';
// import { isDescendant } from '@type-dom/utils';
// import { resetDom } from '../helpers/resetDom';
import { patch } from './patch';
import { ElementNamespace, RendererElement } from './renderer';

export type RootRenderFunction = (
  vnode: TypeNode | undefined,
  container?: RendererElement,
  namespace?: ElementNamespace,
) => void

// todo 先判断子节点中是否已经包含 element.dom
/**
 * mount/vIf true 时调用
 * mount 时， 判断 props.vIf为true时， 创建 element.dom， 并替换注释节点
 * 首次挂载时， 创建 element.dom，appendChild element.dom
 * 再次挂载时， 替换注释节点
 * todo  Fragment  anchor占位，dom挂载后内容是空的，如果dom要存在内容，需要把子节点再挂载上来。
 *   注： Fragment的 anchor占位，不能被替换，因为替换后是无法被找回的。
 *       应该 mount 时， 创建 element.anchor element.dom , 并且在 dom树上挂载了。
 * @param element
 * @param container
 */
let isFlushing = false
export const render: RootRenderFunction = (element, container, namespace) => {
  if (element == null) {
    if (container?.$node) {
      unmount(container.$node, undefined, undefined, true)
    }
  } else {
    patch(
      container?.$node,
      element,
      container,
      undefined,
      undefined,
      namespace,
    )
  }
  (container as any)._vnode = element
  if (!isFlushing) {
    isFlushing = true
    flushPreFlushCbs()
    flushPostFlushCbs()
    isFlushing = false
  }
}
