import type { ITypeElement } from '../type-element/type-element.interface';
import { ITypeConfig } from '../config.interface';

export interface ITypeRoot extends ITypeElement {
  el?: HTMLElement;
}

export interface ITypeRootConfig extends ITypeConfig {
  el?: HTMLElement;
  nodeName?: string;
}
