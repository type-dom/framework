import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeButton extends ITypeHtml {
  props: TypeButtonProps;
}

export interface TypeButtonProps extends HtmlProps {
  nodeName?: 'button';
}
