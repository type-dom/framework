import type { ITypeHtml, HtmlProps } from '../type-html.interface';
import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute';

export interface ITypeAbbr extends ITypeHtml {
  props: AbbrProps;
}

export interface AbbrProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['abbr'];
}
