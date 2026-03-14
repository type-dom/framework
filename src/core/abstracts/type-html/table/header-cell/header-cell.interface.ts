import { IntrinsicElementAttributes } from '../../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../../type-html.interface';

export interface ITypeTableHeaderCell extends ITypeHtml {
  props: TableHeaderCellProps
}

export interface TableHeaderCellProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['th'];
}
