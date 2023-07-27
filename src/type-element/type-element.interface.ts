/**
 * 虚拟dom的数据结构字面量接口。
 */
import { ITypeNode } from '../type-node/type-node.interface';
import { IStyle } from '../style/style.interface';
import {TypeElement} from "./type-element.abstract";
export interface ITypeAttribute {
  // id?: string;
  class?: string,
  name?: string,
  type?: string,
  start?: string,
  [key: string]: string | number | boolean | unknown | undefined;
}
export interface ITypeProperty {
  attrObj: Partial<ITypeAttribute>;
  styleObj: Partial<IStyle>;
  classes?: string[];
}
/**
 * 虚拟 DOM 节点的 *字面量* 表示。
 */
export interface ITypeElement extends ITypeNode {
  className: string; // todo enum ??
  propObj: ITypeProperty;
  childNodes: Array<ITypeNode>;// contents
}
export interface IBoundBox {
  top: string,
  left: string,
  width: string,
  height: string,
}

export interface ITextItem extends ITypeNode {
  nodeValue: string
}
export interface IXItem extends ITypeNode {
  template: string,
  // data: Record<string, any>,
  // methods: Record<string, Function>
}
export interface IElementItem extends ITypeNode {
  TypeClass: TypeElement,
}
