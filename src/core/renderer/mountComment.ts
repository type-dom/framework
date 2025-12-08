
import { TypeNode } from '../type-node/type-node.abstract';
import { createDom } from '../helpers/createDom';
import { RendererElement } from './renderer';

export function mountComment(element: TypeNode, el?: RendererElement) {
  // console.warn('mount comment . ');
  element.dom = createDom(element);
  if (element.dom instanceof Comment) {
    element.dom?.remove();
    element.created();
    element.render();
    element.beforeMount();
    if (element.dom) {
      let appEl: RendererElement | undefined;
      // if (typeof el === 'string') {
      //   appEl = document.querySelector<HTMLElement>(el) as ;
      // } else
      if (el) {
        appEl = el;
      } else {
        appEl = element.parent?.elementParent?.dom as RendererElement | undefined;
      }
      appEl?.appendChild(element.dom);
    }
    // console.log('element.dom is ', element.dom);
    element.mounted();
  } else {
    console.warn('element is not CommentNode, but is ', element);
  }
  return element;
}
