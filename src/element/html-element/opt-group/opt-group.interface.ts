import type { ITypeHtml } from '../../../type-element/type-html/type-html.interface';
import { ITypeConfig } from '../../../config.interface';
import { TypeSelect } from '@type-dom/framework';

export interface IOptGroup extends ITypeHtml {
  nodeName: 'optgroup';
  className: 'OptGroup';
  // childNodes: ITypNode[],
}

export interface IOptGroupConfig extends ITypeConfig {
  parent: TypeSelect;
}
