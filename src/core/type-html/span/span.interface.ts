import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeSpan extends ITypeHtml {
  props: TypeSpanProps;
}

export interface TypeSpanProps extends HtmlProps {
  nodeName?: 'span';
}
