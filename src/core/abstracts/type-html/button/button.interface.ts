import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeButton extends ITypeHtml {
  props: ButtonProps;
}

export interface ButtonProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['button'];
}
