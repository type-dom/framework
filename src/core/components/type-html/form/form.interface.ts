import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeForm extends ITypeHtml {
  props: FormProps;
}

export interface FormProps extends HtmlProps {
  nodeName?: 'form';
  attrObj?: IntrinsicElementAttributes['form'];
}
