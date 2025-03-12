import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeBr extends ITypeHtml {
  props: TypeBrProps;
}

export interface TypeBrProps extends HtmlProps {
  nodeName?: 'br';
}
