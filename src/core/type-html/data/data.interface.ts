import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeData extends ITypeHtml {
  props: TypeDataProps;
}

export interface TypeDataProps extends HtmlProps {
  nodeName?: 'data';
  attrObj?: IntrinsicElementAttributes['data'];
}
