import { TypeTableDataCell } from '../../../../core/type-html/table/data-cell/data-cell.abstract';
import { ITypeConfig } from '../../../../core/type-node/type-node.interface';
import type { ITableDataCell } from './data-cell.interface';

export class TableDataCell extends TypeTableDataCell implements ITableDataCell {
  className: 'TableDataCell';

  constructor(params: ITypeConfig) {
    super();
    this.className = 'TableDataCell';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
