import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeDel extends ITypeHtml {
  props: ITypeDelConfig;
}

export interface ITypeDelConfig extends ITypeHtmlConfig {
  nodeName?: 'del';
}
