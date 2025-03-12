import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeRt extends ITypeHtml {
  props: TypeRtProps;
}

export interface TypeRtProps extends HtmlProps {
  nodeName?: 'rt';
}
