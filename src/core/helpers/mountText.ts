import { TypeNode } from '../type-node/type-node.abstract';
import { TypeEl } from '../type-element/type-element.interface';
import { LifecycleHooks } from '../enums';

export function mountText(element: TypeNode, el?: TypeEl) {
  console.warn('mountText . ');
  if (element.dom instanceof Text) {
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
        appEl = element.parent?.elementParent?.dom as  HTMLElement | SVGElement | undefined;
      }
      appEl?.appendChild(element.dom);
    }
    // console.log('element.dom is ', element.dom);
    element.lifeCycles[LifecycleHooks.MOUNTED]?.forEach((cb) => cb());
  } else {
    console.error('element is not TextNode .');
  }
  return element;
}
