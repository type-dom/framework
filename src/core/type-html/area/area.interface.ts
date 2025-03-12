import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeArea extends ITypeHtml {
  props: TypeAreaProps;
}
export interface TypeAreaProps extends HtmlProps {
  nodeName?: 'area';
}
