import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeLegend extends ITypeHtml {
  props: TypeLegendProps;
}

export interface TypeLegendProps extends HtmlProps {
  nodeName?: 'legend';
}
