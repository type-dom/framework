import type { ITypeHtml, ITypeHtmlConfig } from '../../type-html.interface';
import type { ITypeTableDataCell } from '../data-cell/data-cell.interface';

export interface ITypeTableRow extends ITypeHtml {
  props: ITypeTableRowConfig;
  childNodes: ITypeTableDataCell[];
}

export interface ITypeTableRowConfig extends ITypeHtmlConfig {
  nodeName?: 'tr';
}
