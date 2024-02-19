import type { ITypeTableBody } from '../../../../type-element/type-html/table/body/body.interface';
import type { ITableRow } from '../row/row.interface';
export interface ITableBody extends ITypeTableBody {
  className: 'TableBody',
  childNodes: ITableRow[],
}
