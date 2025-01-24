import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeBr extends ITypeHtml {
  props: ITypeBrConfig;
}

export interface ITypeBrConfig extends ITypeHtmlConfig {
  nodeName?: 'br';
}
