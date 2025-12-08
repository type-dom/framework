import {NodeName} from "../enums";
import {TypeNode} from "../type-node/type-node.abstract";
import { isRef, unref, watch } from '../../reactivity';

/**
 * 创建DOM元素
 *
 * 根据提供的标签名创建一个DOM元素，并将该元素赋值给实例的dom属性
 * todo tag是响应式数据时，需要动态创建。
 */
// todo 与 transition 中对应的方法
export function createDom<T extends TypeNode = TypeNode>(node: T) {
  if (!node.dom) { // todo 注释了，可能会影响子dom的绑定关系。
    // console.warn('createDom node.dom has existed . ');
    const nodeName = unref(node.$options.tag) || node.$options.nodeName;
    if (nodeName === NodeName.FRAGMENT) {
      node.dom = document.createDocumentFragment();
    } else if (nodeName === NodeName.TEXT) {
      node.dom = document.createTextNode(
        String(node.$options.nodeValue ?? '')
      ); // todo content
    } else if (nodeName === NodeName.COMMENT) {
      node.dom = document.createComment(String(node.$options.nodeValue ?? ''))
    } else {
      node.dom = document.createElement(nodeName || 'div');
    }
  }
  if (isRef(node.$options.tag)) {
    watch(node.$options.tag, (newValue, oldValue) => {
      const children = node.dom?.childNodes;
      let dom: HTMLElement | DocumentFragment | Text | Comment;
      if (newValue === NodeName.FRAGMENT) {
        dom = document.createDocumentFragment();
        children?.forEach(child => {
          dom?.appendChild(child);
        })
      } else if (newValue === NodeName.TEXT) {
        dom = document.createTextNode(
          String(node.$options.nodeValue ?? '')
        ); // todo content
      } else if (newValue === NodeName.COMMENT) {
        dom = document.createComment(String(node.$options.nodeValue ?? ''))
      } else {
        dom = document.createElement(newValue || 'div'); // todo node.dom还要挂载到父级dom，而且是指定位置
        children?.forEach(child => {
          dom.appendChild(child);
        })
      }
      node.dom?.parentElement?.replaceChild(dom, node.dom);
      node.dom = dom;
      if (node.$options.refDom) {
        node.$options.refDom.set(dom as HTMLElement);
      }
      node.$options.nodeName = newValue;
      node.render();
    })
  }
  return node.dom as Exclude<T['dom'], undefined | null>;
}
