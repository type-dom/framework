import type { ITypeHtml, ITypeHtmlConfig } from '../../type-html.interface';
import type { ITypeTableRow } from '../row/row.interface';

export interface ITypeTableBody extends ITypeHtml {
  props: ITypeTableBodyConfig;
  childNodes: ITypeTableRow[];
}

export interface ITypeTableBodyConfig extends ITypeHtmlConfig {
  nodeName?: 'tbody';
}
