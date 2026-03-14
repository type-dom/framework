import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeDialog extends ITypeHtml {
  props: DialogProps;
}

export interface DialogProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['dialog'];
}
