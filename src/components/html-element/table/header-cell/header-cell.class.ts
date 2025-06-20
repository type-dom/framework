import { TypeTableHeaderCell } from '../../../../core/type-html/table/header-cell/header-cell.abstract';
import { TypeTableHeaderCellProps } from '../../../../core/type-html/table/header-cell/header-cell.interface';
import type { ITableHeaderCell } from './header-cell.interface';

// 表格表头
export class TableHeaderCell extends TypeTableHeaderCell implements ITableHeaderCell {
  className: 'TableHeaderCell';
  override props: TypeTableHeaderCellProps;

  override isBasic = true;

  constructor(params: TypeTableHeaderCellProps = {}) {
    super();
    this.className = 'TableHeaderCell';
    this.slotChildren(params.slot);
    this.props = this.useParams(params);
  }
}
