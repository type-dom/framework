import { TypeTableRow } from '../../../../../core/components/type-html/table/row/row.abstract';
import { TableRowProps } from '../../../../../core/components/type-html/table/row/row.interface';
import { transformSlot } from '../../../../../core/helpers/transformSlot';
import type { ITableRow } from './row.interface';

export class TableRow extends TypeTableRow implements ITableRow {
  className: 'TableRow';

  override isBasic = true;

  constructor(params: TableRowProps = {}) {
    super(params);
    this.className = 'TableRow';
    transformSlot(this, params.slot);
  }
}
