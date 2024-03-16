import { IStyle } from './style/style.interface';
import { ITypeAttribute } from './type-element/type-element.interface';
import { TypeElement } from './type-element/type-element.abstract';
// import type { ITypeElement } from './type-element/type-element.interface';
// import type { ITextNode } from './text-node/text-node.interface';
import { TextNode } from './text-node/text-node.class';
export interface ITypeConfig {
  parent?: TypeElement;
  name?: string;
  text?: string;
  styleObj?: Partial<IStyle>;
  attrObj?: Partial<ITypeAttribute>;
  // todo 可能是类实例对象；也可能是json对象；
  childNodes?: (TypeElement | TextNode)[];
}
