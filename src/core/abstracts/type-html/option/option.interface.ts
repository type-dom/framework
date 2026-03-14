import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeOption extends ITypeHtml {
  props: OptionProps;
}

export interface OptionProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['option'];
}
