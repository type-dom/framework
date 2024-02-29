import type { ITypeNode } from '../../type-node/type-node.interface';
import { TypeElement } from '../type-element.abstract';
import type { ITypeHtml } from '../type-html/type-html.interface';
export interface ITypeComponent extends ITypeHtml {
  nodeName: string;
  childNodes: Array<ITypeNode>;// contents
}
export interface IComponent extends ITypeNode {
  TypeClass: TypeElement,
  config: never,
}
