import { TypeNode } from './type-node.abstract';

/**
 * 清除自有dom节点。对象自身还没有被删除。
 * 删除对象，要在父级中。
 * node.dom的值也没有变。
 */
export function useRemoveDom(node: TypeNode): void {
  // console.error('removeDom . ');
  if (node.dom) {
    if (node.dom instanceof DocumentFragment) {
      node.childNodes?.forEach((child) => child.removeDom());
    } else {
      node.dom.remove();
    }
  } else {
    // console.error('node.dom has been removed . ');
  }
}
