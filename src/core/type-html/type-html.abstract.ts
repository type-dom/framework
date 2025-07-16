/**
 * TypeHtml类是TypeElement的抽象子类，实现了ITypeHtml接口，用于定义HTML标签的类型。
 * 这个类提供了HTML元素的基本结构和行为的抽象。
 * 将组件和dom的具体类型进行了关联；
 */
import { TypeElement, vHash } from '../../core/type-element/type-element.abstract';
import { Style } from '../style/style.class';
import { StyleValue } from '../style/style.interface';
import { Attribute } from '../attribute/attribute.class';
import type { ITypeHtml, HtmlProps } from './type-html.interface';

export abstract class TypeHtml<T extends HTMLElement = HTMLElement>
  extends TypeElement implements ITypeHtml {
  /**
   * 代表HTML元素的抽象属性。
   * 该属性应为一个`HTMLElement`类型，是具体实现中必须提供的。
   * 子类需要实现这个属性，以提供对具体HTML元素的访问。
   */
  abstract override dom?: T; // 构造阶段不创建dom
  abstract override props: HtmlProps;
  // private timer?: ReturnType<typeof rAF> | undefined;
  // transitionTimer?: NodeJS.Timeout;
  style: Style;
  attr: Attribute;

  constructor() {
    super();
    this.style = new Style(this);
    this.attr = new Attribute(this);
    this.attr.addId(this.componentId);
    this.attr.addObj({
      ['data-v-' + vHash]: '',
    })
  }

  addStyleObj(styleObj?: StyleValue) {
    this.style.addObj(styleObj);
  }

  setStyleObj(styleObj?: StyleValue) {
    this.style.setObj(styleObj);
  }

  addAttrObj(attrObj?: Record<string, string>) {
    this.attr.addObj(attrObj);
  }

  setAttrObj(attrObj?: Record<string, string>) {
    this.attr.setObj(attrObj);
  }
}
