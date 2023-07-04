import { ITypeTableBody } from '../../../../../../../type-dom/type-element/type-html/table/body/body.interface';
import { ITableRow } from '../row/row.interface';
export interface ITableBody extends ITypeTableBody {
  className: 'TableBody',
  childNodes: ITableRow[],
}
