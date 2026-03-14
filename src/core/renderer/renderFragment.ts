import { MaybeRef, unref } from '../../reactivity';
import { Teleport } from '../../dom/components/teleport/teleport.class';
import { TypeFragment } from '../abstracts/type-fragment/type-fragment.abstract';
import { renderAnchor } from './anchor';
import { RendererElement } from './renderer';
import { renderTeleport } from './renderTeleport';
import { removeBetween } from './removeBetween';

/**
 * 重置 DocumentFragment 类型的 element.dom 并重新挂载子节点。
 * 此函数的目的是在 element.dom 是 DocumentFragment 实例时，确保其子节点被正确地重新挂载。
 * 确保元素拥有注释节点作为占位符
 * element.anchor element.targetAnchor
 * 当element.anchor不存在时创建新的注释节点
 * @param element {TypeNode} - 代表一个 DOM 元素节点。
 * @param container
 * @param show
 */
export function renderFragment(element: TypeFragment, container: RendererElement, show: MaybeRef<boolean> = true) {
  if (container instanceof Text || container instanceof Comment) {
    console.error('mountFragment， upDom is Text or Comment . ');
    return;
  }
  const parentNode = element.anchor?.parentNode;

  const ifShow = unref(show);
  if (!ifShow) { // hide
    if (!element.anchorStart || !element.anchor) {
      console.debug('element.anchorStart or element.anchor is undefined . ');
      return;
    }
    if (element.className === 'Teleport') {
      if (element.targetStart && element.targetAnchor) {
        removeBetween(element.targetStart, element.targetAnchor, element.dom);
      } else {
        console.error(
          'element.targetStart or element.targetAnchor is undefined . '
        );
      }
    } else {
      removeBetween(element.anchorStart, element.anchor, element.dom);
    }
  } else { // show true
    // .anchor  fragment or vIf
    // todo Teleport
    if (element.className === 'Teleport') {
      if (element.isMounted) {
        // console.debug('teleport.isMounted is true . ');
      } else {
        renderTeleport(element as Teleport, container);
      }
    } else {
      if (parentNode) {
        if (parentNode === element.dom) {
          container.appendChild(element.dom);
        } else {
          parentNode.insertBefore(element.dom, element.anchor!);
        }
      } else {
        renderAnchor(element, container);
        container.insertBefore(element.dom, element.anchor!);
      }
    }
  }
}
