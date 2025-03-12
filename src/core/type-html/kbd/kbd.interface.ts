import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeKbd extends ITypeHtml {
  props: TypeKbdProps;
}

export interface TypeKbdProps extends HtmlProps {
  nodeName?: 'kbd';
}
