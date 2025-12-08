import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeHeader extends ITypeHtml {
  props: HeaderProps;
}

export interface HeaderProps extends HtmlProps {
  nodeName?: 'header';
  attrObj?: IntrinsicElementAttributes['header'];
}
