import type { ITypeHtml, HtmlProps } from '../../type-html.interface';

export interface ITypeDD extends ITypeHtml {
  props: TypeDDProps;
}

export interface TypeDDProps extends HtmlProps {
  nodeName?: 'dd';
}
