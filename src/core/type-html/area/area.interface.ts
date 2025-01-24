import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeArea extends ITypeHtml {
  props: ITypeAreaConfig;
}
export interface ITypeAreaConfig extends ITypeHtmlConfig {
  nodeName?: 'area';
}
