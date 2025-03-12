import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeTextarea extends ITypeHtml {
  props: TypeTextareaProps;
}

export interface TypeTextareaProps extends HtmlProps {
  nodeName: 'textarea';
}
