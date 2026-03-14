import { TypeTableRow } from '../../../../../core/abstracts/type-html/table/row/row.abstract';
import { TableRowProps } from '../../../../../core/abstracts/type-html/table/row/row.interface';
import type { ITableRow } from './row.interface';

export class TableRow extends TypeTableRow implements ITableRow {
  className: 'TableRow';
  constructor(params: TableRowProps = {}) {
    super(params);
    this.className = 'TableRow';
  }
}
