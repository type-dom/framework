import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeIns extends ITypeHtml {
  props: InsProps;
}

export interface InsProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['ins'];
}
