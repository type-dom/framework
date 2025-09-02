import { LifecycleHooks } from '../enums';
import { TypeEl } from '../type-element/type-element.interface';
import { TypeNode } from '../type-node/type-node.abstract';
import { createDom } from './createDom';

export function mountComment(element: TypeNode, el?: TypeEl) {
  // console.warn('mount comment . ');
  element.dom = createDom(element);
  if (element.dom instanceof Comment) {
    element.dom?.remove();
    element.lifeCycles[LifecycleHooks.CREATED]?.forEach((cb) => cb());
    element.render();
    element.lifeCycles[LifecycleHooks.BEFORE_MOUNT]?.forEach((cb) => cb());
    if (element.dom) {
      let appEl: Exclude<TypeEl, string>;
      if (typeof el === 'string') {
        appEl = document.querySelector<HTMLElement>(el);
      } else if (el) {
        appEl = el;
      } else {
        appEl = element.parent?.elementParent?.dom as
          | HTMLElement
          | SVGElement
          | undefined;
      }
      appEl?.appendChild(element.dom);
    }
    // console.log('element.dom is ', element.dom);
    element.lifeCycles[LifecycleHooks.MOUNTED]?.forEach((cb) => cb());
  } else {
    console.warn('element is not CommentNode')
  }
  return element;
}
