import type { ITypeHtml, HtmlProps } from '../type-html.interface';
import { IntrinsicElementAttributes } from '../../attribute';

export interface ITypeAddress extends ITypeHtml {
  props: TypeAddressProps;
}
export interface TypeAddressProps extends HtmlProps {
  nodeName?: 'address';
  attrObj?: IntrinsicElementAttributes['address']
}
