import type { ITypeHtml, HtmlProps } from '../type-html.interface';
import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute';

export interface ITypeAbbr extends ITypeHtml {
  props: TypeAbbrProps;
}

export interface TypeAbbrProps extends HtmlProps {
  nodeName?: 'abbr';
  attrObj?: IntrinsicElementAttributes['abbr'];
}
