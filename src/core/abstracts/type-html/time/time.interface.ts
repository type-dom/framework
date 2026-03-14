import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeTime extends ITypeHtml {
  props: TimeProps;
}

export interface TimeProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['time'];
}
