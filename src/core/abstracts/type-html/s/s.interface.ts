import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeS extends ITypeHtml {
  props: SProps;
}

export interface SProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['s'];
}
