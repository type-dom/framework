import { TypeTableHeaderCell } from '../../../../../core/components/type-html/table/header-cell/header-cell.abstract';
import { TableHeaderCellProps } from '../../../../../core/components/type-html/table/header-cell/header-cell.interface';
import { transformSlot } from '../../../../../core/helpers/transformSlot';
import type { ITableHeaderCell } from './header-cell.interface';

// 表格表头
export class TableHeaderCell extends TypeTableHeaderCell implements ITableHeaderCell {
  className: 'TableHeaderCell';

  override isBasic = true;

  constructor(params: TableHeaderCellProps = {}) {
    super(params);
    this.className = 'TableHeaderCell';
    transformSlot(this, params.slot);
  }
}
