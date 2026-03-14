import { TypeTableDataCell } from '../../../../../core/abstracts/type-html/table/data-cell/data-cell.abstract';
import { TableDataCellProps } from '../../../../../core/abstracts/type-html/table/data-cell/data-cell.interface';
import type { ITableDataCell } from './data-cell.interface';

export class TableDataCell extends TypeTableDataCell implements ITableDataCell {
  className: 'TableDataCell';
  constructor(params: TableDataCellProps = {}) {
    super(params);
    this.className = 'TableDataCell';
  }
}
