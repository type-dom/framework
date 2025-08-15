/**
 * TypeHtml类是TypeElement的抽象子类，实现了ITypeHtml接口，用于定义HTML标签的类型。
 * 这个类提供了HTML元素的基本结构和行为的抽象。
 * 将组件和dom的具体类型进行了关联；
 */
import { addStyleObj, setStyleObj } from '../../../dom/modules/style/style';
import { StyleValue } from '../../../dom/modules/style/style.interface';
import { addAttrId, addAttrObj, HTMLAttributes } from '../../../dom/modules/attribute';
import { ToMaybeRefs } from '../../../reactivity';
import { TypeElement, vHash } from '../../type-element/type-element.abstract';
import type { ITypeHtml, HtmlProps } from './type-html.interface';

export abstract class TypeHtml<T extends HTMLElement = HTMLElement, A extends ToMaybeRefs<HTMLAttributes> = ToMaybeRefs<HTMLAttributes>>
  extends TypeElement<A> implements ITypeHtml {
  /**
   * 代表HTML元素的抽象属性。
   * 该属性应为一个`HTMLElement`类型，是具体实现中必须提供的。
   * 子类需要实现这个属性，以提供对具体HTML元素的访问。
   */
  abstract override dom?: T; // 构造阶段不创建dom
  abstract override props: HtmlProps;
  // private timer?: ReturnType<typeof rAF> | undefined;
  // transitionTimer?: NodeJS.Timeout;

  constructor() {
    super();
    addAttrId(this, this.componentId);
    addAttrObj(this, {
      ['data-v-' + vHash]: '',
    })
  }

  addStyleObj(styleObj?: StyleValue) {
    addStyleObj(this, styleObj);
  }

  setStyleObj(styleObj?: StyleValue) {
    setStyleObj(this, styleObj);
  }
}
