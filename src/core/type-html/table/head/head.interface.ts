import type { ITypeHtml, ITypeHtmlConfig } from '../../type-html.interface';
import type { ITypeTableHeaderCell } from '../header-cell/header-cell.interface';

export interface ITypeTableHead extends ITypeHtml {
  props: ITypeTableHeadConfig;
  childNodes: ITypeTableHeaderCell[];
}

export interface ITypeTableHeadConfig extends ITypeHtmlConfig {
  nodeName?: 'thead';
}
