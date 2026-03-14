import { IntrinsicElementAttributes } from '../../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../../type-html.interface';

export interface ITypeDD extends ITypeHtml {
  props: DDProps;
}

export interface DDProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['dd'];
}
