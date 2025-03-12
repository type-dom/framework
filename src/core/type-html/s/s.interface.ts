import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeS extends ITypeHtml {
  props: TypeSProps;
}

export interface TypeSProps extends HtmlProps {
  nodeName?: 's';
}
