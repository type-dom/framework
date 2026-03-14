import { TypeTable } from '../../../../core/abstracts/type-html/table/table.abstract';
import { TableProps } from '../../../../core/abstracts/type-html/table/table.interface';
import { TableRow } from './row/row.class';
import { TableHead } from './head/head.class';
import type { ITable } from './table.interface';

export class Table extends TypeTable implements ITable {
  className: 'Table';
  override childNodes: (TableHead | TableRow)[];

  constructor(params: TableProps = {}) {
    super(params);
    this.className = 'Table';
    this.childNodes = [];
  }
}
