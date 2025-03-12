import type { ITypeHtml, HtmlProps } from '../type-html.interface';

/**
 * Horizontal Rule
 */
export interface ITypeHr extends ITypeHtml {
  props: TypeHrProps;
}

export interface TypeHrProps extends HtmlProps {
  nodeName?: 'hr';
}
