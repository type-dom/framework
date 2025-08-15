import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeA extends ITypeHtml {
  props: TypeAProps;
}

export interface TypeAProps extends HtmlProps {
  nodeName?: 'a';
  attrObj?: IntrinsicElementAttributes['a']
}
