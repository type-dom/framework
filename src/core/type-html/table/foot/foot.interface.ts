import { ITypeHtml, ITypeHtmlConfig } from '../../type-html.interface';
import type { ITypeTableRow } from '../row/row.interface';

export interface ITypeTableFoot extends ITypeHtml {
  props: ITypeTableFootConfig;
  childNodes: ITypeTableRow[];
}

export interface ITypeTableFootConfig extends ITypeHtmlConfig {
  nodeName?: 'tfoot';
}
