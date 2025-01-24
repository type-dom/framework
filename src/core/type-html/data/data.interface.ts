import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeData extends ITypeHtml {
  props: ITypeDataConfig;
}

export interface ITypeDataConfig extends ITypeHtmlConfig {
  nodeName?: 'data';
}
