import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeCode extends ITypeHtml {
  props: TypeCodeProps;
}

export interface TypeCodeProps extends HtmlProps {
  nodeName?: 'code';
}
