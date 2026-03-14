import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeHGroup extends ITypeHtml {
  props: HGroupProps;
}

export interface HGroupProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['hgroup'];
}
