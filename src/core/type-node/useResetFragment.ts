import { TypeNode } from './type-node.abstract';
/**
 * 重置 DocumentFragment 类型的 element.dom 并重新挂载子节点。
 * 此函数的目的是在 element.dom 是 DocumentFragment 实例时，确保其子节点被正确地重新挂载。
 *
 * @param element {TypeNode} - 代表一个 DOM 元素节点。
 */
export function useResetFragment(element: TypeNode) {
  // 检查 element.dom 是否为 DocumentFragment 实例。
  if (element.dom instanceof DocumentFragment) {
    // 如果是 DocumentFragment，进一步检查其子节点数量是否为零。
    if (element.dom.childElementCount > 0) {
      // 如果子节点数量不为零，先清理现有的子节点，然后重新挂载。
      element.clearChildDom();
    }
    element.childNodes?.forEach(child => {
      // 重置子节点的 DocumentFragment。
      useResetFragment(child);
      // 如果子节点的 dom 不存在，创建并渲染其 DOM。
      if (!child.dom) {
        child.createDom();
        child.render();
      }
      // 将子节点的 dom 附加到 element.dom 上。
      element.dom?.appendChild(child.dom!);
    });
    // 日志输出 DocumentFragment 的子节点不为空。
    console.log('DocumentFragment 的子节点不为空');
  }
}
