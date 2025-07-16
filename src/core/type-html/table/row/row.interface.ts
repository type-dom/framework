import { IntrinsicElementAttributes } from '../../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../../type-html.interface';
import type { ITypeTableDataCell } from '../data-cell/data-cell.interface';

export interface ITypeTableRow extends ITypeHtml {
  props: TypeTableRowProps;
  childNodes: ITypeTableDataCell[];
}

export interface TypeTableRowProps extends HtmlProps {
  nodeName?: 'tr';
  attrObj?: IntrinsicElementAttributes['tr'];
}
