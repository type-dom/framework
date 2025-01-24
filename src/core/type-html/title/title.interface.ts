import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeTitle extends ITypeHtml {
  props: ITypeTitleConfig;
}

export interface ITypeTitleConfig extends ITypeHtmlConfig {
  nodeName?: 'title';
}
