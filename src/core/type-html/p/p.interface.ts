import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeP extends ITypeHtml {
  props: ITypePConfig
}

export interface ITypePConfig extends ITypeHtmlConfig {
  nodeName?: 'p';
}
