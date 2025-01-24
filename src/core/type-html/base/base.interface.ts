import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeBase extends ITypeHtml {
  props: ITypeBaseConfig;
}

export interface ITypeBaseConfig extends ITypeHtmlConfig {
  nodeName?: 'base';
}
