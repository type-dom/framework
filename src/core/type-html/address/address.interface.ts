import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeAddress extends ITypeHtml {
  props: TypeAddressProps;
}
export interface TypeAddressProps extends HtmlProps {
  nodeName?: 'address';
}
