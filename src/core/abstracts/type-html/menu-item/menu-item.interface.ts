import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeMenuItem extends ITypeHtml {
  props: MenuItemProps;
}

export interface MenuItemProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['menu'];
}
