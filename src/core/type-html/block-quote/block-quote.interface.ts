import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeBlockQuote extends ITypeHtml {
  props: TypeBlockQuoteProps;
}

export interface TypeBlockQuoteProps extends HtmlProps {
  nodeName: 'blockquote';
}
