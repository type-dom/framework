// import { isDescendant } from '@type-dom/utils';
// import { getNodeContainer } from '../helpers/getNodeContainer';
import { TypeNode } from '../abstracts/type-node/type-node.abstract';
// import { flushPostFlushCbs, flushPreFlushCbs } from '../scheduler';
// import { unmount } from './unmount';
import { TypeFragment } from '../abstracts';
import { renderFragment } from './renderFragment';
import { RendererElement } from './renderer';

/**
 * mount/vIf true 时调用
 * mount 时， 判断 props.vIf为true时， 创建 element.dom， 并替换注释节点
 * 首次挂载时， 创建 element.dom，appendChild element.dom
 * 再次挂载时， 替换注释节点
 * todo  Fragment  anchor占位，dom挂载后内容是空的，如果dom要存在内容，需要把子节点再挂载上来。
 *   注： Fragment的 anchor占位，不能被替换，因为替换后是无法被找回的。
 *       应该 mount 时， 创建 element.anchor element.dom , 并且在 dom树上挂载了。
 * @param node
 * @param container
 * @param show
 */
// let isFlushing = false
export const renderElement = (node: TypeNode, container: RendererElement, show = true) => {
  if (show) {
    const parentNode = node.anchor?.parentNode;
    if (parentNode) {
      parentNode.insertBefore(node.dom, node.anchor!);
    } else {
      container.appendChild(node.dom);
    }
  } else {
    if (node.dom) {
      if (node instanceof TypeFragment) {
        renderFragment(node, container, false);
      } else {
        node.dom.remove();
      }
    }
  }
  // if (!isFlushing) {
  //   isFlushing = true
  //   flushPreFlushCbs()
  //   flushPostFlushCbs()
  //   isFlushing = false
  // }
}
