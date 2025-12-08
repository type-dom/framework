import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeA extends ITypeHtml {
  props: AProps;
}

export interface AProps extends HtmlProps {
  nodeName?: 'a';
  attrObj?: IntrinsicElementAttributes['a']
}
