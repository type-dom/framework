import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeHGroup extends ITypeHtml {
  props: TypeHGroupProps;
}

export interface TypeHGroupProps extends HtmlProps {
  nodeName?: 'hgroup';
  attrObj?: IntrinsicElementAttributes['hgroup'];
}
