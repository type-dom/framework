import type { ITypeHtml } from '../../../core/type-html/type-html.interface';
import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeSelect } from '../../../index';

export interface IOption extends ITypeHtml {
  nodeName: 'option';
  className: 'Option';
  // childNodes: ITypNode[],
}

export interface IOptionConfig extends ITypeConfig {
  parent: TypeSelect;
}
