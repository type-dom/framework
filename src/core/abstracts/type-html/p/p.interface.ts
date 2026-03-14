import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeP extends ITypeHtml {
  props: PProps
}

export interface PProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['p'];
}
