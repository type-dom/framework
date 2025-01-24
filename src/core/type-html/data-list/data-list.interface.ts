import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeDataList extends ITypeHtml {
  props: ITypeDataListConfig;
}

export interface ITypeDataListConfig extends ITypeHtmlConfig {
  nodeName: 'datalist';
}
