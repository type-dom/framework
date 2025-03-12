import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeOutput extends ITypeHtml {
  props: TypeOutputProps;
}

export interface TypeOutputProps extends HtmlProps {
  nodeName?: 'output';
}
