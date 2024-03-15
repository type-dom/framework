import { TypeTableCol } from '../../../../type-element/type-html/table/col/col.abstract';
import { Table } from '../table.class';
import type { ITableCol } from './col.interface';

export class TableCol extends TypeTableCol implements ITableCol {
  className: 'TableCol';

  constructor(public parent: Table) {
    super();
    this.className = 'TableCol';
    this.childNodes = [];
  }
}
