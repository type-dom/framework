import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeMenuItem extends ITypeHtml {
  props: TypeMenuItemProps;
}

export interface TypeMenuItemProps extends HtmlProps {
  nodeName?: 'menuitem';
  attrObj?: IntrinsicElementAttributes['menu'];
}
