import { TypeTableDataCell } from '../../../../../core/components/type-html/table/data-cell/data-cell.abstract';
import { TypeTableDataCellProps } from '../../../../../core/components/type-html/table/data-cell/data-cell.interface';
import type { ITableDataCell } from './data-cell.interface';

export class TableDataCell extends TypeTableDataCell implements ITableDataCell {
  className: 'TableDataCell';

  override isBasic = true;

  constructor(params: TypeTableDataCellProps = {}) {
    super();
    this.className = 'TableDataCell';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
