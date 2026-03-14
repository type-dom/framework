import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeFieldset extends ITypeHtml {
  props: FieldsetProps;
}

export interface FieldsetProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['fieldset'];
}
