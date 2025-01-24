import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeSpan extends ITypeHtml {
  props: ITypeSpanConfig;
}

export interface ITypeSpanConfig extends ITypeHtmlConfig {
  nodeName?: 'span';
}
