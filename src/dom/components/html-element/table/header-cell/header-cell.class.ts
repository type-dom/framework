import { TypeTableHeaderCell } from '../../../../../core/components/type-html/table/header-cell/header-cell.abstract';
import { TypeTableHeaderCellProps } from '../../../../../core/components/type-html/table/header-cell/header-cell.interface';
import { transformSlot } from '../../../../../core/helpers/transformSlot';
import type { ITableHeaderCell } from './header-cell.interface';

// 表格表头
export class TableHeaderCell extends TypeTableHeaderCell implements ITableHeaderCell {
  className: 'TableHeaderCell';
  override props: TypeTableHeaderCellProps;

  override isBasic = true;

  constructor(params: TypeTableHeaderCellProps = {}) {
    super();
    this.className = 'TableHeaderCell';
    transformSlot(this, params.slot);
    this.props = this.useParams(params);
  }
}
