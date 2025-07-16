import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeSummary extends ITypeHtml {
  props: TypeSummaryProps;
}

export interface TypeSummaryProps extends HtmlProps {
  nodeName?: 'summary';
  attrObj?: IntrinsicElementAttributes['summary'];
}
