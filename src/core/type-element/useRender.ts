/**
 * 渲染方法
 * 要调用 element.clearChildDom
 * WebPage要另外处理
 */
import { NodeName } from '../enums';
import { TypeElement } from './type-element.abstract';

export function useRender(element: TypeElement): void {
  element.preRender();
  if (element.props.nodeName !== NodeName.FRAGMENT) {
    element.style?.renderObj();
    element.attr?.renderObj();
  } else {
    // console.log('fragment render .'); // todo
  }
  // console.log('element.dom is ', element.dom);
  element.rendered = true;
}
