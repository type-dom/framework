import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeU extends ITypeHtml {
  props: ITypeUConfig;
}

export interface ITypeUConfig extends ITypeHtmlConfig {
  nodeName?: 'u';
}
