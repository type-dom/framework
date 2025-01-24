import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeKbd extends ITypeHtml {
  props: ITypeKbdConfig;
}

export interface ITypeKbdConfig extends ITypeHtmlConfig {
  nodeName?: 'kbd';
}
