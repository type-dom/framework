/**
 * 虚拟dom的数据结构字面量接口。
 */
import { Property } from '@type-dom/css-type';
import type { ITypeNode } from '../type-node/type-node.interface';

/**
 * 虚拟 DOM 节点的 *字面量* 表示。
 */
export interface ITypeElement extends ITypeNode {
  className: string;
  // nodeValue?: undefined;
  // params?: TypeProps;
  childNodes: Array<ITypeNode | undefined>;
}

export interface IBoundBox {
  top: Property.Left<string | number>;
  left:  Property.Left<string | number>;
  width:  Property.Left<string | number>;
  height:  Property.Left<string | number>;
}

export type RawDom = HTMLElement | SVGElement | ShadowRoot | DocumentFragment;
export type TypeEl =  RawDom  | Document | string | null | undefined;
