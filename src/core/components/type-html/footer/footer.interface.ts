import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeFooter extends ITypeHtml {
  props: FooterProps;
}

export interface FooterProps extends HtmlProps {
  nodeName?: 'footer';
  attrObj?: IntrinsicElementAttributes['footer'];
  height?: string | number;
  backgroundColor?: string;
}
