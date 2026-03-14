import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeStrong extends ITypeHtml {
  props: StrongProps;
}

export interface StrongProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['strong'];
}
