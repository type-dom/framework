import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeVar extends ITypeHtml {
  props: TypeVarProps;
}

export interface TypeVarProps extends HtmlProps {
  nodeName?: 'var';
  attrObj?: IntrinsicElementAttributes['var'];
}
