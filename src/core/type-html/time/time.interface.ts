import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeTime extends ITypeHtml {
  props: ITypeTimeConfig;
}

export interface ITypeTimeConfig extends ITypeHtmlConfig {
  nodeName?: 'time';
}
