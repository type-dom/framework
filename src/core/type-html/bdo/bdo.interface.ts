import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeBdo extends ITypeHtml {
  props: TypeBdoProps;
}

export interface TypeBdoProps extends HtmlProps {
  nodeName?: 'bdo';
}
