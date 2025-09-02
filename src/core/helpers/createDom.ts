import {NodeName} from "../enums";
import {TypeNode} from "../type-node/type-node.abstract";

/**
 * 创建DOM元素
 *
 * 根据提供的标签名创建一个DOM元素，并将该元素赋值给实例的dom属性
 */
// todo 与 transition 中对应的方法
export function createDom<T extends TypeNode = TypeNode>(node: T) {
  if (!node.dom) {
    // console.warn('createDom node.dom has existed . ');
    const nodeName = node.baseProps.tag || node.baseProps.nodeName;
    if (nodeName === NodeName.FRAGMENT) {
      node.dom = document.createDocumentFragment();
    } else if (nodeName === NodeName.TEXT) {
      node.dom = document.createTextNode(
        node.baseProps.nodeValue?.toString() || ''
      ); // todo content
    } else {
      node.dom = document.createElement(nodeName || 'div');
    }
  }
  return node.dom as Exclude<T['dom'], undefined | null>;
}
