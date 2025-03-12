import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeQ extends ITypeHtml {
  props: TypeQProps;
}

export interface TypeQProps extends HtmlProps {
  nodeName?: 'q';
}
