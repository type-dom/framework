import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeMap extends ITypeHtml {
  props: ITypeMapConfig;
}

export interface ITypeMapConfig extends ITypeHtmlConfig {
  nodeName?: 'map';
}
