import {NodeName} from "../enums";
import {TypeNode} from "../abstracts/type-node/type-node.abstract";
import { unref } from '../../reactivity';

/**
 * 创建DOM元素
 *
 * 根据提供的标签名创建一个DOM元素，并将该元素赋值给实例的dom属性
 * todo tag是响应式数据时，需要动态创建。
 * todo 与 transition 中对应的方法
 */
export function createDom<T extends TypeNode = TypeNode>(node: T) {
  if (!node.dom) { // todo 注释了，可能会影响子dom的绑定关系。
    // console.warn('createDom node.dom has existed . ');
    const nodeName = unref(node.props.tag); // || node.props.nodeName;
    if (nodeName === 'fragment') {
      node.dom = document.createDocumentFragment();
    } else if (nodeName === NodeName.TEXT) {
      node.dom = document.createTextNode(
        String(node.props.nodeValue ?? '')
      ); // todo content
    } else if (nodeName === NodeName.COMMENT) {
      node.dom = document.createComment(String(node.props.nodeValue ?? ''))
    } else { // todo svg
      node.dom = document.createElement(nodeName || 'div');
    }
  }
  return node.dom as Exclude<T['dom'], undefined | null>;
}
