import type { ITypeHtml } from '../../../type-element/type-html/type-html.interface';
import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeSelect } from '../../../type-element';

export interface IOption extends ITypeHtml {
  nodeName: 'option';
  className: 'Option';
  // childNodes: ITypNode[],
}

export interface IOptionConfig extends ITypeConfig {
  parent: TypeSelect;
}
