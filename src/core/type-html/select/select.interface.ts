import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeSelect extends ITypeHtml {
  props: TypeSelectProps;
}

export interface TypeSelectProps extends HtmlProps {
  nodeName?: 'select';
}
