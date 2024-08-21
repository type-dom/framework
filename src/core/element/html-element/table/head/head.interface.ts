import type { ITypeTableHead } from '../../../../type-html/table/head/head.interface';
import type { ITableHeaderCell } from '../header-cell/header-cell.interface';

export interface ITableHead extends ITypeTableHead {
  className: 'TableHead';
  childNodes: ITableHeaderCell[];
}
