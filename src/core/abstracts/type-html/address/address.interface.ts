import type { ITypeHtml, HtmlProps } from '../type-html.interface';
import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute';

export interface ITypeAddress extends ITypeHtml {
  props: AddressProps;
}
export interface AddressProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['address']
}
