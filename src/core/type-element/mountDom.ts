import { unref } from '@type-dom/signals';
import { isString } from '@type-dom/utils';
import { TypeNode } from '../type-node/type-node.abstract';
import { NodeName } from '../enums';
import { ElProp } from './type-element.interface';

/**
 * 获取组件挂载的dom
 * @param element
 */
export function mountDom(element: TypeNode) {
  if (getToDom(element)) return getToDom(element);
  if (!element.parent) return;
  if (element.parent?.props.nodeName === NodeName.FRAGMENT) {
    if (element.parent.className === 'Teleport') {
      return getToDom(element.parent);
    } else {
      return mountDom(element.parent);
    }
  } else {
    return element.parent.dom;
  }
}

export function getToDom(element: TypeNode): Exclude<ElProp, string> {
    const to = unref(element.to);
    if (!to) return;
    if (element.className === 'TdTeleport' && unref(element.props.disabled)) { // todo refine
      return element.parent?.dom;
    }
    if (isString(to)) {
      return document.querySelector(to) as Exclude<ElProp, string>;
    } else {
      return to;
    }
}
