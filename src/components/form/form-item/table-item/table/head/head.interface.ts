import { ITypeTableHead } from '../../../../../../../type-dom/type-element/type-html/table/head/head.interface';
import { ITableHeaderCell } from '../header-cell/header-cell.interface';
export interface ITableHead extends ITypeTableHead {
  className: 'TableHead',
  childNodes: ITableHeaderCell[]
}
