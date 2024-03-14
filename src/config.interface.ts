import { IStyle, ITypeAttribute, TextNode, TypeElement } from './index';

export interface ITypeConfig {
  parent?: TypeElement;
  name?: string;
  text?: string;
  styleObj?: Partial<IStyle>;
  attrObj?: Partial<ITypeAttribute>;
  childNodes?: (TypeElement | TextNode)[];
}
