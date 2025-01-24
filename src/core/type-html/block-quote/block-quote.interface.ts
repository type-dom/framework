import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeBlockQuote extends ITypeHtml {
  props: ITypeBlockQuoteConfig;
}

export interface ITypeBlockQuoteConfig extends ITypeHtmlConfig {
  nodeName: 'blockquote';
}
