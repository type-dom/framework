import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeNav extends ITypeHtml {
  props: TypeNavProps;
}

export interface TypeNavProps extends HtmlProps {
  nodeName?: 'nav';
}
