import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeBase extends ITypeHtml {
  props: TypeBaseProps;
}

export interface TypeBaseProps extends HtmlProps {
  nodeName?: 'base';
}
