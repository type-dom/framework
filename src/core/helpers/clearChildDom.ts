import { TypeNode } from "../type-node/type-node.abstract";

// clear node.dom.childNodes
export function clearChildDom(node: TypeNode) {
  if (node.dom) {
    while (node.dom.firstChild) {
      node.dom.removeChild(node.dom.firstChild);
    }
  }
}
