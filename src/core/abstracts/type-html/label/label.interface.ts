import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeLabel extends ITypeHtml {
  props: LabelProps;
}

export interface LabelProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['label'];
}
