import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeTable extends ITypeHtml {
  props: TableProps;
}

export interface TableProps extends HtmlProps {
  nodeName?: 'table';
  attrObj?: IntrinsicElementAttributes['table'];
}
