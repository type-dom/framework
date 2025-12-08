import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeSummary extends ITypeHtml {
  props: SummaryProps;
}

export interface SummaryProps extends HtmlProps {
  nodeName?: 'summary';
  attrObj?: IntrinsicElementAttributes['summary'];
}
