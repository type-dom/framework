import type { ITypeTableRow } from '../../../../type-element/type-html/table/row/row.interface';
import type { ITableDataCell } from '../data-cell/data-cell.interface';
export interface ITableRow extends ITypeTableRow {
  className: 'TableRow',
  childNodes: ITableDataCell[],
}
