import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeSup extends ITypeHtml {
  props: SupProps;
}

export interface SupProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['sup'];
}
