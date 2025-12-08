import { TypeNode } from '../type-node/type-node.abstract';
import { TypeEl } from './renderer';

export function mountText(element: TypeNode, el?: TypeEl) {
  // console.warn('mountText . ');
  if (element.dom instanceof Text) {
    element.dom?.remove();
    element.created();
    element.render();
    element.beforeMount();
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
    element.mounted();
  } else {
    console.error('element is not TextNode .');
  }
  return element;
}
