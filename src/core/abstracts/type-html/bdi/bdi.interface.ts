import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeBdi extends ITypeHtml {
  props: BdiProps;
}

export interface BdiProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['bdi'];
}
