import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeAbbr extends ITypeHtml {
  props: TypeAbbrProps;
}

export interface TypeAbbrProps extends HtmlProps {
  nodeName?: 'abbr';
}
