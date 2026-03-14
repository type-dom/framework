import { TypeNode } from '../../../core/abstracts/type-node/type-node.abstract';
import { RendererElement } from '../../../core/renderer/renderer';

export function mountComment(element: TypeNode, container: RendererElement) {
  // console.warn('mount comment . ');
  if (element.dom instanceof Comment) {
    element.dom?.remove();
    element.created();
    element.render();
    element.beforeMount();
    container?.appendChild(element.dom);
    // console.log('element.dom is ', element.dom);
    element.mounted();
  } else {
    throw new Error('element is not CommentNode . ');
  }
}
