import { TypeTableDataCell } from '../../../../type-element/type-html/table/data-cell/data-cell.abstract';
import { TableRow } from '../row/row.class';
import type { ITableDataCell } from './data-cell.interface';
export class TableDataCell extends TypeTableDataCell implements ITableDataCell {
  className: 'TableDataCell';
  constructor(public parent: TableRow) {
    super();
    this.className = 'TableDataCell';
    this.childNodes = [];
  }
}
