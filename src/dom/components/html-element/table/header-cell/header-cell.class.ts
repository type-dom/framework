import { TypeTableHeaderCell } from '../../../../../core/abstracts/type-html/table/header-cell/header-cell.abstract';
import { TableHeaderCellProps } from '../../../../../core/abstracts/type-html/table/header-cell/header-cell.interface';
import type { ITableHeaderCell } from './header-cell.interface';

// 表格表头
export class TableHeaderCell extends TypeTableHeaderCell implements ITableHeaderCell {
  className: 'TableHeaderCell';
  constructor(params: TableHeaderCellProps = {}) {
    super(params);
    this.className = 'TableHeaderCell';
  }
}
