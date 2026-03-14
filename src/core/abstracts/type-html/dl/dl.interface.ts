import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeDL extends ITypeHtml {
  props: DLProps;
}

export interface DLProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['dl'];
}
