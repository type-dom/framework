import { IntrinsicElementAttributes } from '../../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../../type-html.interface';

export interface ITypeTableBody extends ITypeHtml {
  props: TableBodyProps;
}

export interface TableBodyProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['tbody'];
}
