import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeWbr extends ITypeHtml {
  props: WbrProps;
}

export interface WbrProps extends HtmlProps {
  nodeName?: 'wbr';
  attrObj?: IntrinsicElementAttributes['wbr'];
}
