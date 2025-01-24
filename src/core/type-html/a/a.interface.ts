import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeA extends ITypeHtml {
  props: ITypeAConfig;
}

export interface ITypeAConfig extends ITypeHtmlConfig {
  nodeName?: 'a';
}
