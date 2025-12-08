import { isDescendant } from '@type-dom/utils';
import { createDom } from '../helpers/createDom';
import { TypeNode } from '../type-node/type-node.abstract';
import { RawDom, RendererElement } from './renderer';

/**
 * 重置 DocumentFragment 类型的 element.dom 并重新挂载子节点。
 * 此函数的目的是在 element.dom 是 DocumentFragment 实例时，确保其子节点被正确地重新挂载。
 * todo element.anchor element.targetAnchor
 * @param element {TypeNode} - 代表一个 DOM 元素节点。
 * @param container
 */
export function processFragment(element: TypeNode,  container: RendererElement) {
  if (container instanceof Text || container instanceof Comment) {
    console.error('setFragmentAnchorWithDom， upDom is Text or Comment . ');
    return;
  }
  let dom = element.dom;
  if (!dom) dom = createDom(element);
  if (dom instanceof DocumentFragment) {
    // todo Teleport
    if (element.className === 'Teleport') {
      // console.warn('anchorAndDom , element is Teleport');
      if (element.isMounted) {
        console.warn('teleport.isMounted is true . ')
      } else {
        const upDom = element.parent?.dom;
        if (upDom && element.anchorStart && element.anchor && !isDescendant(upDom, element.anchor)) {
          upDom.appendChild(element.anchorStart);
          upDom.appendChild(element.anchor);
        } // fragment作为整体插入锚点位=
      }
      // if (element.parent?.dom) setFragmentAnchor(element, element.parent.dom); // fragment作为整体插入锚点位置；
    } else {
      element.anchorStart = element.anchorStart ?? document.createComment('[' + element.className);
      if (!isDescendant(container, element.anchorStart)) {
        container.appendChild(element.anchorStart);
      }
      element.anchor = element.anchor ?? document.createComment(element.className + ']');
      if (!isDescendant(container, element.anchor)) {
        container.appendChild(element.anchor);
      }
      container.insertBefore(dom, element.anchor);
    }
  } else {
    console.error('element.dom is not DocumentFragment . ');
  }
}
/**
 *  添加 定位锚点
 * 确保元素拥有注释节点作为占位符）
 * 当element.anchor不存在时创建新的注释节点
 */
export function setFragmentAnchor(element: TypeNode, container: RawDom) {
  if (element.dom instanceof DocumentFragment) {
    element.anchorStart = element.anchorStart ?? document.createComment('[' + element.className);
    if (!isDescendant(container, element.anchorStart)) {
      container.appendChild(element.anchorStart);
    }
    element.anchor = element.anchor ?? document.createComment(element.className + ']');
    if (!isDescendant(container, element.anchor)) {
      container.appendChild(element.anchor);
    }
  } else {
    console.error('element.dom is not DocumentFragment . ');
  }
}
