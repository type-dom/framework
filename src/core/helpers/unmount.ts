import { setCurrentInstance } from '../component';
import { LifecycleHooks } from '../enums';
import { TypeElement } from '../type-element/type-element.abstract';
import { TypeNode } from '../type-node/type-node.abstract';
import {clearEvents} from "../event-emitter/event-emitter";

export function unmount(element: TypeNode, root?: TypeElement) {
  element.lifeCycles[LifecycleHooks.BEFORE_UNMOUNT]?.forEach(fn => fn());
  // element.removeDom();
  clearEvents(element);
  if (element.dom) {
    if (element.dom instanceof DocumentFragment) {
      // 清空 DocumentFragment； 如果没有挂载，dom 会有子dom
      if (element.dom.replaceChildren) {
        element.dom.replaceChildren();
      } else {
        while (element.dom.firstChild) {
          element.dom.removeChild(element.dom.firstChild);
        }
      }
    } else {
      // 删除DOM
      element.dom.remove();
      element.dom = undefined;
    }
  } else {
    console.warn('unmount element.dom is null . ');
  }
  element.childNodes?.forEach(child => unmount(child));
  element.childNodes = [];
  delete element.styleObj;
  delete element.attrObj;
  // delete element.baseProps;
  // Reflect.deleteProperty(element, 'props');
  if (element.parent) {
    element.parent.childNodes.splice(element.index, 1);
  } else {
    console.error('useUnmount element.parent is null . ');
    // 没有 parent 要root 遍历删除；
    // todo  如果项目没有设置root，则无法删除了。或者有多个root时，可能查找有问题；
    //      element.parent 都没有了，还如何获取 element.root ?
    const parent = element.findParent(root, element);
    if (parent?.childNodes) parent.childNodes.splice(parent.childNodes.indexOf(element), 1);
  }
  element.lifeCycles[LifecycleHooks.UNMOUNTED]?.forEach(fn => fn());
  setCurrentInstance(null);
  //   ToDo
  // element = undefined;
  // for (let key in element) {
  //   delete element[key];
  // }
}
