/**
 * `TypeHtml`类是`TypeElement`的抽象子类，实现了`ITypeHtml`接口，用于定义HTML标签的类型。
 * 这个类提供了HTML元素的基本结构和行为的抽象。
 */
import { TypeElement } from '../../core/type-element/type-element.abstract';
import type { ITypeHtml } from './type-html.interface';
import type { ITypeConfig } from '../type-node/type-node.interface';

export abstract class TypeHtml extends TypeElement implements ITypeHtml {
  abstract override nodeName: string; // 必然有；
  /**
   * 代表HTML元素的抽象属性。
   * 该属性应为一个`HTMLElement`类型，是具体实现中必须提供的。
   * 子类需要实现这个属性，以提供对具体HTML元素的访问。
   */
  abstract override dom: HTMLElement;

  override useParams<T extends ITypeConfig>(params = {} as T): T {
    // 插槽默认替换子节点；
    if (params.slot) {
      this.slotChild(params.slot);
    }
    return super.useParams(params);
  }
}
