import { TypeSelect } from '../../type-html/select/select.abstract';
import type { ITypeHtml } from '../../type-html/type-html.interface';
import type { ITypeConfig } from '../../../core/type-node/type-node.interface';

export interface IOptGroup extends ITypeHtml {
  nodeName: 'optgroup';
  className: 'OptGroup';
  // childNodes: ITypNode[],
}

export interface IOptGroupConfig extends ITypeConfig {
  parent: TypeSelect;
}
