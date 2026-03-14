import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeRt extends ITypeHtml {
  props: RtProps;
}

export interface RtProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['rt'];
}
