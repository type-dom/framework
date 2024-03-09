import type { ITypeHtml } from '../../../type-element/type-html/type-html.interface';
import { TypeSelect } from '../../../type-element/type-html/select/select.abstract';
import { ITypeConfig } from '../../../config.interface';


export interface IOptGroup extends ITypeHtml {
  nodeName: 'optgroup';
  className: 'OptGroup';
  // childNodes: ITypNode[],
}

export interface IOptGroupConfig extends ITypeConfig {
  parent: TypeSelect;
}
