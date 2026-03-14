import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypePre extends ITypeHtml {
  props: PreProps;
}

export interface PreProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['pre'];
}
