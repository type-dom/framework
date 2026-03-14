import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeUL extends ITypeHtml {
  props: ULProps;
}

export interface ULProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['ul'];
}
