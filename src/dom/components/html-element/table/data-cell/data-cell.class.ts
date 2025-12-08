import { TypeTableDataCell } from '../../../../../core/components/type-html/table/data-cell/data-cell.abstract';
import { TableDataCellProps } from '../../../../../core/components/type-html/table/data-cell/data-cell.interface';
import { transformSlot } from '../../../../../core/helpers/transformSlot';
import type { ITableDataCell } from './data-cell.interface';

export class TableDataCell extends TypeTableDataCell implements ITableDataCell {
  className: 'TableDataCell';

  override isBasic = true;

  constructor(params: TableDataCellProps = {}) {
    super(params);
    this.className = 'TableDataCell';
    transformSlot(this, params.slot);
  }
}
