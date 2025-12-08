import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeFigure extends ITypeHtml {
  props: FigureProps;
}

export interface FigureProps extends HtmlProps {
  nodeName?: 'figure';
  attrObj?: IntrinsicElementAttributes['figure'];
}
