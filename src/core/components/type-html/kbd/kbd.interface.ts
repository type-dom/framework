import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeKbd extends ITypeHtml {
  props: KbdProps;
}

export interface KbdProps extends HtmlProps {
  nodeName?: 'kbd';
  attrObj?: IntrinsicElementAttributes['kbd'];
}
