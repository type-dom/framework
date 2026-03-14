import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeLegend extends ITypeHtml {
  props: LegendProps;
}

export interface LegendProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['legend'];
}
