import { flushPostFlushCbs, flushPreFlushCbs } from '../scheduler';
import { TypeNode } from '../abstracts/type-node/type-node.abstract';
import { unmount } from './unmount';
// import { patch } from './patch';
import { RendererNode } from './renderer';

/**
 *
 * @param element
 * @param container
 */
let isFlushing = false
export const render = (
  element: TypeNode | null,
  container: RendererNode
) => {
  // console.error('render, element is ', element);
  if (element == null) {
    if (container?.$node) {
      unmount(container.$node) // , true)
    }
  } else {
    // patch(
    //   container?.$node, // old node
    //   element,
    //   container,
    //   undefined,
    //   undefined,
    //   namespace,
    // )

    const node = container.$node;
    if (element === node) {
      return;
    }
    if (node) {
      unmount(node);
    }
    element.mount(container);
  }
  container.$node = element;
  if (!isFlushing) {
    isFlushing = true
    flushPreFlushCbs()
    flushPostFlushCbs()
    isFlushing = false
  }
}
