import type { ITypeHtml, HtmlProps } from '../type-html.interface';
import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute';

export interface ITypeArea extends ITypeHtml {
  props: AreaProps;
}
export interface AreaProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['area'];
}
