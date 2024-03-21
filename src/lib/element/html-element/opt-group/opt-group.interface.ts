import { TypeSelect } from '../../../type-element/type-html/select/select.abstract';
import type { ITypeHtml } from '../../../type-element/type-html/type-html.interface';
import { ITypeConfig } from '../../../type-node/type-node.interface';

export interface IOptGroup extends ITypeHtml {
  nodeName: 'optgroup';
  className: 'OptGroup';
  // childNodes: ITypNode[],
}

export interface IOptGroupConfig extends ITypeConfig {
  parent: TypeSelect;
}
