import { TypeTableHeaderCell } from '../../../../core/type-html/table/header-cell/header-cell.abstract';
import { TableHead } from '../head/head.class';
import type { ITableHeaderCell } from './header-cell.interface';

// 表格表头
export class TableHeaderCell
  extends TypeTableHeaderCell
  implements ITableHeaderCell
{
  className: 'TableHeaderCell';

  override isBasic = true;

  constructor(public override parent: TableHead) {
    super();
    this.className = 'TableHeaderCell';
  }
}
