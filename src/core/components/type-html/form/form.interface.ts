import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeForm extends ITypeHtml {
  props: TypeFormProps;
}

export interface TypeFormProps extends HtmlProps {
  nodeName?: 'form';
  attrObj?: IntrinsicElementAttributes['form'];
}
