/**
 * 渲染方法
 * 要调用 element.clearChildDom
 * WebPage要另外处理
 */
import { renderAttrObj } from '../../dom/modules/attribute';
import { renderStyleObj } from '../../dom/modules/style/style';
import { NodeName } from '../enums';
import { TypeElement } from '../type-element/type-element.abstract';

export function useRender(element: TypeElement): void {
  element.preRender();
  if (element.baseProps.nodeName !== NodeName.FRAGMENT) {
    renderStyleObj(element);
    renderAttrObj(element);
  } else {
    // console.log('fragment render .'); // todo
  }
  // console.log('element.dom is ', element.dom);
  element.isRendered = true;
}
