import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeFooter extends ITypeHtml {
  props: TypeFooterProps;
}

export interface TypeFooterProps extends HtmlProps {
  nodeName?: 'footer';
  attrObj?: IntrinsicElementAttributes['footer'];
}
