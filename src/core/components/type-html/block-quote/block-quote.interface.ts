import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeBlockQuote extends ITypeHtml {
  props: BlockQuoteProps;
}

export interface BlockQuoteProps extends HtmlProps {
  nodeName?: 'blockquote';
  attrObj?: IntrinsicElementAttributes['blockquote'];
}
