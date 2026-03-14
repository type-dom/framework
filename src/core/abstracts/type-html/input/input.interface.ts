import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeInput extends ITypeHtml {
  props: InputProps;
}

export interface InputProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['input'];
}
