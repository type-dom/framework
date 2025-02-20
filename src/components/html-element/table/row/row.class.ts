import { TypeTableRow } from '../../../../core/type-html/table/row/row.abstract';
import { ITypeConfig } from '../../../../core/type-node/type-node.interface';
import { TableDataCell } from '../data-cell/data-cell.class';
import type { ITableRow } from './row.interface';

export class TableRow extends TypeTableRow implements ITableRow {
  className: 'TableRow';
  override childNodes: TableDataCell[];

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'TableRow';
    this.childNodes = [];
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
