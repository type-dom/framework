import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeTable extends ITypeHtml {
  props: ITypeTableConfig;
}

export interface ITypeTableConfig extends ITypeHtmlConfig {
  nodeName?: 'table';
}
