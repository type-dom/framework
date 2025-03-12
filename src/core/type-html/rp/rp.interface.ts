import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeRp extends ITypeHtml {
  props: TypeRpProps;
}

export interface TypeRpProps extends HtmlProps {
  nodeName?: 'rp';
}
