import { TypeTableBody } from '../../../../type-element/type-html/table/body/body.abstract';
import { Table } from '../table.class';
import { TableRow } from '../row/row.class';
import type { ITableBody } from './body.interface';

export class TableBody extends TypeTableBody implements ITableBody {
  className: 'TableBody';
  override childNodes: TableRow[];

  constructor(public override parent: Table) {
    super();
    this.className = 'TableBody';
    this.childNodes = [];
  }
}
