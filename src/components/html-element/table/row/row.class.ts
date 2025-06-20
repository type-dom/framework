import { TypeTableRow } from '../../../../core/type-html/table/row/row.abstract';
import { TypeTableRowProps } from '../../../../core/type-html/table/row/row.interface';
import type { ITableRow } from './row.interface';

export class TableRow extends TypeTableRow implements ITableRow {
  className: 'TableRow';
  override props: TypeTableRowProps;

  override isBasic = true;

  constructor(params: TypeTableRowProps = {}) {
    super();
    this.className = 'TableRow';
    this.slotChildren(params.slot);
    this.props = this.useParams(params);
  }
}
