import type { ITypeTable } from '../../../type-element/type-html/table/table.interface';
import type { ITableHead } from './head/head.interface';
import type { ITableRow } from './row/row.interface';

export interface ITable extends ITypeTable {
  className: 'Table';
  childNodes: (ITableRow | ITableHead)[];
}
