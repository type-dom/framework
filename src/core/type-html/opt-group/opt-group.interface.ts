import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeOptGroup extends ITypeHtml {
  props: TypeOptGroupProps;
}

export interface TypeOptGroupProps extends HtmlProps {
  nodeName: 'optgroup';
}
