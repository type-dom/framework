import { TypeTableFoot } from '../../../../type-element/type-html/table/foot/foot.abstract';
import { TableRow } from '../row/row.class';
import { Table } from '../table.class';
import type { ITableFoot } from './foot.interface';

export class TableFoot extends TypeTableFoot implements ITableFoot {
  className: 'TableFoot';
  declare childNodes: TableRow[];

  constructor(public parent: Table) {
    super();
    this.className = 'TableFoot';
    this.childNodes = [];
  }
}
