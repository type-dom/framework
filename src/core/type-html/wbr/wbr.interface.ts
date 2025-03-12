import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeWbr extends ITypeHtml {
  props: TypeWbrProps;
}

export interface TypeWbrProps extends HtmlProps {
  nodeName?: 'wbr';
}
