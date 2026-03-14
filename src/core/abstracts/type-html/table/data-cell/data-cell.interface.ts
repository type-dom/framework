import { IntrinsicElementAttributes } from '../../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../../type-html.interface';

export interface ITypeTableDataCell extends ITypeHtml {
  props: TableDataCellProps;
}

export interface TableDataCellProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['td'];
}
