import { TypeTableRow } from '../../../../core/type-html/table/row/row.abstract';
import { TypeProps } from '../../../../core/type-node/type-node.interface';
import { TableDataCell } from '../data-cell/data-cell.class';
import type { ITableRow } from './row.interface';

export class TableRow extends TypeTableRow implements ITableRow {
  className: 'TableRow';
  override childNodes: TableDataCell[];

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'TableRow';
    this.childNodes = [];
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
