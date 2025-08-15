import type { ITypeHtml, HtmlProps } from '../type-html.interface';
import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute';

export interface ITypeB extends ITypeHtml {
  props: TypeBProps;
}

export interface TypeBProps extends HtmlProps {
  nodeName?: 'b';
  attrObj?: IntrinsicElementAttributes['b'];
}
