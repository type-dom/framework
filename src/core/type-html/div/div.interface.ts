import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeDiv extends ITypeHtml {
  props: TypeDivProps;
}

export interface TypeDivProps extends HtmlProps {
  nodeName?: 'div';
}
