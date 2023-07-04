import { ITypeTableRow } from '../../../../../../../type-dom/type-element/type-html/table/row/row.interface';
import { ITableDataCell } from '../data-cell/data-cell.interface';

export interface ITableRow extends ITypeTableRow {
  className: 'TableRow',
  childNodes: ITableDataCell[],
}
