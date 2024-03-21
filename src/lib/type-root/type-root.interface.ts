import type { ITypeElement } from '../type-element/type-element.interface';
import { ITypeConfig } from '../type-node/type-node.interface';

export interface ITypeRoot extends ITypeElement {
  el?: HTMLElement;
  isRoot: true;
}

export interface ITypeRootConfig extends ITypeConfig {
  el?: HTMLElement;
  nodeName?: string;
}
