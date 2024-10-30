import { SlotNode } from '../../components/slot-node/slot-node.class';
import { ITypeElement } from '../type-element/type-element.interface';
import { TypeElement } from '../type-element/type-element.abstract';
import { ISlotNodes, ITypeConfig } from '../type-node/type-node.interface';

export interface ITypeComponent extends ITypeElement {
  componentId?: string | number;
}

export interface IComponentConfig extends ITypeConfig {
  // tag 组件标签 默认 div
  tag?: string;
  items?: ITypeConfig[];
  childNodes?: TypeElement[] | undefined;
}

export interface IComponentSlotNodes extends ISlotNodes {
  default?: SlotNode; // 默认插槽，也可以没有的。
}
