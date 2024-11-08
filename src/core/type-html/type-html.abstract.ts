/**
 * `TypeHtml`类是`TypeElement`的抽象子类，实现了`ITypeHtml`接口，用于定义HTML标签的类型。
 * 这个类提供了HTML元素的基本结构和行为的抽象。
 */
import { TypeElement } from '../../core/type-element/type-element.abstract';
import { SlotNode } from '../../components/slot-node/slot-node.class';
// import type { ITypeConfig } from '../type-node/type-node.interface';
// import { TypeComponent } from '../type-component/type-component.abstract';
import type { ITypeHtml } from './type-html.interface';
import { Style } from '../style/style.class';
import { Attribute } from '../attribute/attribute.class';

export abstract class TypeHtml<T extends HTMLElement = HTMLElement> extends TypeElement implements ITypeHtml {
  abstract override nodeName: string; // 必然有；
  /**
   * 代表HTML元素的抽象属性。
   * 该属性应为一个`HTMLElement`类型，是具体实现中必须提供的。
   * 子类需要实现这个属性，以提供对具体HTML元素的访问。
   */
  abstract override dom: T;
  style: Style;
  attr: Attribute;
  constructor() {
    super();
    this.style = new Style(this);
    this.attr = new Attribute(this);
  }

  /**
   * 确保slot存在，不存在则创建；
   * 要在useSlots之后调用
   *
   * @param name
   */
  getSlotNode(name = 'default') {
    // return this.slotNodes[name];
    return this.slotNodes[name] = this.slotNodes[name] ?? new SlotNode(name);
  }
  //
  // useSlots(params?: ITypeConfig): ISlotNodes {
  //   if (params?.slot) {
  //     this.getSlotNode().resetSlot(params.slot);
  //   }
  //   params?.slots &&
  //   Object.keys(params.slots).forEach((key) => {
  //     this.getSlotNode(key).resetSlot(params.slots?.[key]);
  //   });
  //   return this.slotNodes;
  // }
}
