import { isDescendant } from '@type-dom/utils';
import { TypeNode } from '../type-node/type-node.abstract';
import { RendererElement } from './renderer';

/**
 * 处理元素的注释占位符初始化及DOM替换逻辑
 * todo Teleport 要单独处理
 * @param element 待处理的元素对象，包含DOM节点及关联的注释节点
 * @param container
 * @returns void
 */
export function processElement(element: TypeNode, container: RendererElement) {
  if (element.dom instanceof DocumentFragment) {
    console.error('element.dom is DocumentFragment . ');
    return;
  }
  element.anchor = element.anchor ?? document.createComment('v-if' + element.className + '' + element.uid);
  if (!isDescendant(container, element.anchor)) {
    if (element.dom && isDescendant(container, element.dom)) {
      container.insertBefore(element.anchor, element.dom); // TdSubMenu collapse切换时，子菜单加载到菜单上方。
    } else {
      container?.appendChild(element.anchor);
    }
  }
}
