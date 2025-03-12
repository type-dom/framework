import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeCite extends ITypeHtml {
  props: TypeCiteProps;
}

export interface TypeCiteProps extends HtmlProps {
  nodeName?: 'cite';
}
