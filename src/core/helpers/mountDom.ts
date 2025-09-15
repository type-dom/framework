import { isString } from '@type-dom/utils';
import { unref } from '../../reactivity';
import { TypeNode } from '../type-node/type-node.abstract';
import { NodeName } from '../enums';
import { RawDom } from '../type-element/type-element.interface';

/**
 * 获取组件挂载的dom
 * @param element
 */
export function mountDom(element: TypeNode) {
  if (getToDom(element)) return getToDom(element);
  if (!element.parent) return;
  if (element.parent.baseProps.nodeName === NodeName.FRAGMENT) {
    if (element.parent.className === 'Teleport') { // todo TdTeleport
      return getToDom(element.parent);
    } else {
      return mountDom(element.parent);
    }
  } else {
    return element.parent.dom;
  }
}

export function getToDom(element: TypeNode): RawDom | undefined {
    const to = unref(element.to);
    if (!to) return;
    if (element.className === 'TdTeleport' && unref(element.baseProps.disabled)) { // todo refine
      return element.parent?.dom;
    }
    if (isString(to)) {
      return document.querySelector(to) as RawDom;
    } else {
      return to;
    }
}
