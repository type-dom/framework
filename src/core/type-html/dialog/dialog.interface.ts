import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeDialog extends ITypeHtml {
  props: TypeDialogProps;
}

export interface TypeDialogProps extends HtmlProps {
  nodeName?: 'dialog';
  attrObj?: IntrinsicElementAttributes['dialog'];
}
