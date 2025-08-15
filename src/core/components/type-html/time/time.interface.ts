import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeTime extends ITypeHtml {
  props: TypeTimeProps;
}

export interface TypeTimeProps extends HtmlProps {
  nodeName?: 'time';
  attrObj?: IntrinsicElementAttributes['time'];
}
