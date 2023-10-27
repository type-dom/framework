import { ITypeDiv } from '../type-element/type-html/div/div.interface';
import { TypeRoot } from './type-root.abstract';
import {ITypeNode} from "../type-node/type-node.interface";
export interface ITypeRoot extends ITypeDiv {
  // className: 'TypeRoot',
  parent: TypeRoot;
}

export interface ITypeRootOption extends ITypeNode {
  el: HTMLElement | string,
}
