import type { ITypeTableFoot } from '../../../../core/type-html/table/foot/foot.interface';
import type { ITableRow } from '../row/row.interface';

export interface ITableFoot extends ITypeTableFoot {
  className: 'TableFoot';
  childNodes: ITableRow[];
}
