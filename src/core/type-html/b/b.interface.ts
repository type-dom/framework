import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeB extends ITypeHtml {
  props: TypeBProps;
}

export interface TypeBProps extends HtmlProps {
  nodeName?: 'b';
}
