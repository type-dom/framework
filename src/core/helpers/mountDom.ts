import { isString } from '@type-dom/utils';
import { unref } from '../../reactivity';
import { TypeNode } from '../type-node/type-node.abstract';
// import { RawDom } from '../type-element/type-element.interface';
import { TypeElement } from '../type-element/type-element.abstract';
import { RealDom } from '../renderer/renderer';

/**
 * 获取组件挂载的dom
 * @param element
 */
export function mountDom(element: TypeNode) {
  if (getToDom(element)) return getToDom(element);
  // todo error DialogContent parentDom is TdFocusTrap
  // todo  element.anchor.parentElement  element.anchor.parentNode  element.target element.targetAnchor
  if (element.parentDom && !(element.parentDom instanceof DocumentFragment)) return element.parentDom;
  if (!element.parent) return;
  if (element.parent.dom instanceof DocumentFragment) {
    if (element.parent.className === 'Teleport') { // todo TdTeleport
      return getToDom(element.parent);
    } else {
      return mountDom(element.parent);
    }
  } else {
    return element.parent.dom;
  }
}

export function getToDom(element: TypeNode):  RealDom | undefined {
  try {
    const to = unref(element.to);
    // console.warn('to is ', to);
    if (!to) return;
    // if (element.className === 'TdTeleport' && unref(element.$options.disabled)) { // todo refine
    //   return element.parent?.dom;
    // }
    if (isString(to)) {
      return document.querySelector(to) as HTMLElement | SVGElement | ShadowRoot | undefined;
    } else if (to instanceof TypeElement) {
      if (to.dom instanceof DocumentFragment) {
        throw Error('to is DocumentFragment . ');
      }
      return to.dom as  HTMLElement | SVGElement | undefined;
    } else {
      return to;
    }
  } catch (error) {
    console.error('getToDom error . ', error);
    return;
  }
}
