import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeBdo extends ITypeHtml {
  props: BdoProps;
}

export interface BdoProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['bdo'];
}
