import { TypeNode } from '../type-node/type-node.abstract';

/**
 * 清除自有dom节点。对象自身还没有被删除。
 * 删除对象，要在父级中。
 * node.dom的值也没有变。
 * 注： 这样删除时，不会删除 node.anchor/node.anchorStart 等锚点。
 */
export function removeDom(node: TypeNode): void {
  // console.error('removeDom . ');
  if (node.dom) {
    if (node.dom instanceof DocumentFragment) {
      node.childNodes?.forEach((child) => removeDom(child));
    } else {
      node.dom.remove();
    }
  } else {
    console.error('node.dom has been removed . ');
  }
}
