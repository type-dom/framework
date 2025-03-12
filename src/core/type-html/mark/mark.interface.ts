import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeMark extends ITypeHtml {
  props: TypeMarkProps;
}

export interface TypeMarkProps extends HtmlProps {
  nodeName?: 'mark';
}
