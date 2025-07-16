import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeTable extends ITypeHtml {
  props: TypeTableProps;
}

export interface TypeTableProps extends HtmlProps {
  nodeName?: 'table';
  attrObj?: IntrinsicElementAttributes['table'];
}
