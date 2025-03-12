import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeDel extends ITypeHtml {
  props: TypeDelProps;
}

export interface TypeDelProps extends HtmlProps {
  nodeName?: 'del';
}
