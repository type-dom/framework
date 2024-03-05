import type { ITypeElement } from '../type-element/type-element.interface';
import { ITypeNode } from '../type-node/type-node.interface';

export interface ITypeRoot extends ITypeElement {
  el?: HTMLElement;
}

export interface ITypeRootConfig extends ITypeNode {
  el?: HTMLElement;
}
