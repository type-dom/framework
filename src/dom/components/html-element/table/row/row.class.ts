import { TypeTableRow } from '../../../../../core/components/type-html/table/row/row.abstract';
import { TypeTableRowProps } from '../../../../../core/components/type-html/table/row/row.interface';
import { transformSlot } from '../../../../../core/helpers/transformSlot';
import type { ITableRow } from './row.interface';

export class TableRow extends TypeTableRow implements ITableRow {
  className: 'TableRow';
  override props: TypeTableRowProps;

  override isBasic = true;

  constructor(params: TypeTableRowProps = {}) {
    super();
    this.className = 'TableRow';
    transformSlot(this, params.slot);
    this.props = this.useParams(params);
  }
}
