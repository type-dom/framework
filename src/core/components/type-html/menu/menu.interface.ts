import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeMenu extends ITypeHtml {
  props: TypeMenuProps;
}

export interface TypeMenuProps extends HtmlProps {
  nodeName?: 'menu';
  attrObj?: IntrinsicElementAttributes['menu'];
}
