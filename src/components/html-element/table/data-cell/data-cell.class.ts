import { TypeTableDataCell } from '../../../../core/type-html/table/data-cell/data-cell.abstract';
import { TypeProps } from '../../../../core/type-node/type-node.interface';
import type { ITableDataCell } from './data-cell.interface';

export class TableDataCell extends TypeTableDataCell implements ITableDataCell {
  className: 'TableDataCell';

  override isBasic = true;

  constructor(params: TypeProps) {
    super();
    this.className = 'TableDataCell';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
