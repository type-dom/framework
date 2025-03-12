import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeSamp extends ITypeHtml {
  props: TypeSampProps;
}

export interface TypeSampProps extends HtmlProps {
  nodeName?: 'samp';
}
