import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeEm extends ITypeHtml {
  props: ITypeEmConfig;
}

export interface ITypeEmConfig extends ITypeHtmlConfig {
  nodeName?: 'em';
}
