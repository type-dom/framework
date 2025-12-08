import { TypeNode } from '../type-node/type-node.abstract';

/**
 * 清除自有dom节点。对象自身还没有被删除。
 * 删除对象，要在父级中。
 * node.dom的值也没有变。
 * 注： 这样删除时，不会删除 node.anchor/node.anchorStart 等锚点。
 * todo Teleport 删除时，锚点也要删除。
 */
export function removeDom(node: TypeNode): void {
  // console.error('removeDom . ');
  if (node.dom) {
    if (node.dom instanceof DocumentFragment) {
      if (node.className ===  'Teleport') {
        // node.anchorStart?.remove();
        // node.anchor?.remove();
        node.targetStart?.remove();
        node.targetAnchor?.remove();
      }
      // const upDom = mountDom(node);
      // if (!upDom) {
      //   console.warn('upDom is undefined . ');
      //   return;
      // }
      if (!node.anchor || !node.anchorStart) {
        console.warn('node.anchor or node.anchorStart is undefined . ');
        // return;
      }
      // removeNodesBetween(upDom, node.anchorStart, node.anchor);
      node.childNodes?.forEach((child) => removeDom(child));
    } else {
      node.dom.remove();
    }
  }
}

/**
 * 删除两个DOM元素之间的所有兄弟节点
 * todo 删除后，锚点位置的元素会被删除，后续定位是个问题？？
 * @param parentDom 父级DOM元素
 * @param startNode 起始节点
 * @param endNode 结束节点
 * @returns 被删除的节点数组
 */
export function removeNodesBetween(parentDom: HTMLElement | SVGElement | DocumentFragment | Document, startNode: ChildNode, endNode: ChildNode): Node[] {
  const removedNodes: Node[] = [];

  // 检查两个节点是否都在同一个父级元素中
  if (startNode.parentNode !== parentDom || endNode.parentNode !== parentDom) {
    console.warn('Start node or end node is not a child of the parentDom');
    return removedNodes;
  }

  // 获取所有子节点数组
  const childNodes = Array.from(parentDom.childNodes);
  const startIndex = childNodes.indexOf(startNode);
  const endIndex = childNodes.indexOf(endNode);

  // 检查索引有效性
  if (startIndex === -1 || endIndex === -1) {
    console.warn('Start node or end node not found in parentDom');
    return removedNodes;
  }

  // 确保起始节点在结束节点之前
  if (startIndex >= endIndex) {
    console.warn('Start node should be before end node');
    return removedNodes;
  }

  // 删除两个节点之间的所有节点
  for (let i = startIndex + 1; i < endIndex; i++) {
    const nodeToRemove = childNodes[i];
    // 因为每次删除节点后索引会变化，所以始终删除 startIndex + 1 位置的节点
    parentDom.removeChild(nodeToRemove);
    removedNodes.push(nodeToRemove);
  }

  return removedNodes;
}
