import { TypeTableRow } from '../../../../type-element/type-html/table/row/row.abstract';
import { Table } from '../table.class';
import type { ITableRow } from './row.interface';
import { TableDataCell } from '../data-cell/data-cell.class';
export class TableRow extends TypeTableRow implements ITableRow {
  className: 'TableRow';
  declare childNodes: TableDataCell[];
  constructor(public parent: Table) {
    super();
    this.className = 'TableRow';
    this.childNodes = [];
  }
}
