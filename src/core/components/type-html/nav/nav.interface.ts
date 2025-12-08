import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeNav extends ITypeHtml {
  props: NavProps;
}

export interface NavProps extends HtmlProps {
  nodeName?: 'nav';
  attrObj?: IntrinsicElementAttributes['nav'];
}
