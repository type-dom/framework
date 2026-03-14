import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeMenu extends ITypeHtml {
  props: MenuProps;
}

export interface MenuProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['menu'];
}
