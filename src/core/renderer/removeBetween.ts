import { RendererNode } from './renderer';

/**
 * 移除两个节点之间的所有节点
 *
 * @param start - 起始节点
 * @param end - 结束节点
 * @param container - 可选的容器，如果提供则将移除的节点添加到此容器中，否则直接删除节点
 * @returns 无返回值
 */
export function removeBetween(start: RendererNode, end: RendererNode, container?: DocumentFragment) {
  try {
    // 检查起始节点和结束节点是否具有相同的父节点
    if (start.parentNode !== end.parentNode) {
      console.error('start and end are not siblings nodes.');
      return;
    }
    const fragment = container ?? document.createDocumentFragment();
    // 1. 收集要删除的节点
    // 获取起始节点的下一个兄弟节点
    let currentNode = start.nextSibling;
    // 遍历并处理起始节点和结束节点之间的所有节点
    while (currentNode && currentNode !== end) {
      const nextNode = currentNode.nextSibling;
      // 如果提供了容器，则将当前节点添加到容器中
      fragment.appendChild(currentNode);
      currentNode = nextNode;
    }
    // 2. 一次性地从DOM移除
    if (!container) {
      // fragment中的节点会自动从原位置移除
      // 或者直接清除fragment
      while (fragment.firstChild) {
        fragment.removeChild(fragment.firstChild);
      }
    }
  } catch (error) {
    console.error('Failed to remove nodes:', error);
  }
}
