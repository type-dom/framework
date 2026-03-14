import { TypeNode } from '../../../core/abstracts/type-node/type-node.abstract';
import { RendererElement } from '../../../core/renderer';

export function mountText(element: TypeNode, container: RendererElement) {
  // console.warn('mountText . ');
  if (element.dom instanceof Text) {
    element.dom.remove();
    element.created();
    element.render();
    element.beforeMount();
    // let appEl: RendererElement;
    // // if (typeof el === 'string') {
    // //   appEl = document.querySelector<HTMLElement>(el) as RendererElement;
    // // } else
    // if (container) {
    //   appEl = container;
    // } else {
    //   appEl = element.parent?.elementParent?.dom as RendererElement;
    // }
    container.appendChild(element.dom);
    // console.log('element.dom is ', element.dom);
    element.mounted();
  } else {
    // console.error('element is not TextNode .');
    throw Error('element is not TextNode .');
  }
}
