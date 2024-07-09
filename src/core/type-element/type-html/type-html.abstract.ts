/**
 * `TypeHtml`类是`TypeElement`的抽象子类，实现了`ITypeHtml`接口，用于定义HTML标签的类型。
 * 这个类提供了HTML元素的基本结构和行为的抽象。
 */
import { TypeElement } from '../type-element.abstract';
import type { ITypeHtml } from './type-html.interface';

export abstract class TypeHtml extends TypeElement implements ITypeHtml {
  /**
   * 父级`TypeHtml`对象的可选引用。
   * 该属性允许子元素引用其父元素，以便实现诸如事件冒泡等功能。
   */
  override parent?: TypeHtml;

  /**
   * 代表HTML元素的抽象属性。
   * 该属性应为一个`HTMLElement`类型，是具体实现中必须提供的。
   * 子类需要实现这个属性，以提供对具体HTML元素的访问。
   */
  abstract override dom: HTMLElement;
}
