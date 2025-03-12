import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypePre extends ITypeHtml {
  props: TypePreProps;
}

export interface TypePreProps extends HtmlProps {
  nodeName?: 'pre';
}
