import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeS extends ITypeHtml {
  props: ITypeSConfig;
}

export interface ITypeSConfig extends ITypeHtmlConfig {
  nodeName?: 's';
}
