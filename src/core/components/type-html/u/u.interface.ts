import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeU extends ITypeHtml {
  props: UProps;
}

export interface UProps extends HtmlProps {
  nodeName?: 'u';
  attrObj?: IntrinsicElementAttributes['u'];
}
