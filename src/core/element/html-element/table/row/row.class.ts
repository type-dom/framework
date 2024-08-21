import { TypeTableRow } from '../../../../type-html/table/row/row.abstract';
import { ITypeConfig } from '../../../../type-node/type-node.interface';
import { TableDataCell } from '../data-cell/data-cell.class';
import type { ITableRow } from './row.interface';

export class TableRow extends TypeTableRow implements ITableRow {
  className: 'TableRow';
  override childNodes: TableDataCell[];

  constructor(public override config?: ITypeConfig) {
    super();
    this.className = 'TableRow';
    this.childNodes = [];

    this.setConfig(config);
  }
}
