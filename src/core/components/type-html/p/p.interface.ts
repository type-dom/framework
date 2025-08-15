import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeP extends ITypeHtml {
  props: TypePProps
}

export interface TypePProps extends HtmlProps {
  nodeName?: 'p';
  attrObj?: IntrinsicElementAttributes['p'];
}
