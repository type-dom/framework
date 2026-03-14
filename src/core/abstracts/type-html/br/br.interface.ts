import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeBr extends ITypeHtml {
  props: BrProps;
}

export interface BrProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['br'];
}
