import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeVar extends ITypeHtml {
  props: VarProps;
}

export interface VarProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['var'];
}
