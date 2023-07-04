import { ITypeTableFoot } from '../../../../../../../type-dom/type-element/type-html/table/foot/foot.interface';
import { ITableRow } from '../row/row.interface';
export interface ITableFoot extends ITypeTableFoot {
  className: 'TableFoot',
  childNodes: ITableRow[],
}
