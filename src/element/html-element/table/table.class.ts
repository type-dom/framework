import { TypeTable } from '../../../type-element/type-html/table/table.abstract';
import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TableRow } from './row/row.class';
import { TableHead } from './head/head.class';
import type { ITable } from './table.interface';
export class Table extends TypeTable implements ITable {
  className: 'Table';
  declare childNodes: (TableHead | TableRow)[];
  constructor(public parent: TypeHtml) {
    super();
    this.className = 'Table';
    this.childNodes = [];
  }
}
