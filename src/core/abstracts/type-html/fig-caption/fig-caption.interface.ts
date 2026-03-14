import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeFigCaption extends ITypeHtml {
  props: FigCaptionProps;
}

export interface FigCaptionProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['figcaption'];
}
