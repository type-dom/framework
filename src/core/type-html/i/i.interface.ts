import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeI extends ITypeHtml {
  props: ITypeIConfig;
}

export interface ITypeIConfig extends ITypeHtmlConfig {
  nodeName?: 'i';
}
