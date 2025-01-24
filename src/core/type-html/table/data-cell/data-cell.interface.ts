import type { ITypeHtml, ITypeHtmlConfig } from '../../type-html.interface';

export interface ITypeTableDataCell extends ITypeHtml {
  props: ITypeTableDataCellConfig;
}

export interface ITypeTableDataCellConfig extends ITypeHtmlConfig {
  nodeName?: 'td';
}
