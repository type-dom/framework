import { ITypeNode } from '../type-node/type-node.interface';
import { ITypeElement } from '../type-element/type-element.interface';
export interface ITypeRoot extends ITypeElement {
  // className: 'TypeRoot',
  // parent: ITypeRoot;
  nodeName: string;
}

export interface ITypeRootOption extends ITypeNode {
  el: HTMLElement | string,
  nodeName: string,
}
