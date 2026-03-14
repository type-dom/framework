import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeDetails extends ITypeHtml {
  props: DetailsProps;
}

export interface DetailsProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['details'];
}
