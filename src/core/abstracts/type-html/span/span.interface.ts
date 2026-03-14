import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeSpan extends ITypeHtml {
  props: SpanProps;
}

export interface SpanProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['span'];
}
