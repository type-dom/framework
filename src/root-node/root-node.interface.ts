import type { ITypeElement } from '../type-element/type-element.interface';
import { ITypeNode } from '../type-node/type-node.interface';
export interface IRootNode extends ITypeElement {
  el?: HTMLElement
}
export interface IRootNodeConfig extends ITypeNode {
  el?: HTMLElement
}
