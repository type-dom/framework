import { TypeTableHeaderCell } from '../../../../index';
import { TableHead } from '../head/head.class';
import type { ITableHeaderCell } from './header-cell.interface';

// 表格表头
export class TableHeaderCell
  extends TypeTableHeaderCell
  implements ITableHeaderCell
{
  className: 'TableHeaderCell';

  constructor(public override parent: TableHead) {
    super();
    this.className = 'TableHeaderCell';
  }
}
