import type { ITypeHtml, HtmlProps } from '../type-html.interface';
import { IntrinsicElementAttributes } from '../../attribute';

export interface ITypeArea extends ITypeHtml {
  props: TypeAreaProps;
}
export interface TypeAreaProps extends HtmlProps {
  nodeName?: 'area';
  attrObj?: IntrinsicElementAttributes['area'];
}
