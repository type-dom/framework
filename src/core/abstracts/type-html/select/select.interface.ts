import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeSelect extends ITypeHtml {
  props: SelectProps;
}

export interface SelectProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['select'];
}
