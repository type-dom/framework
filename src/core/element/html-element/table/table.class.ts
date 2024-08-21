import { TypeTable } from '../../../type-html/table/table.abstract';
import type { ITypeConfig } from '../../../type-node/type-node.interface';
import { TableRow } from './row/row.class';
import { TableHead } from './head/head.class';
import type { ITable } from './table.interface';

export class Table extends TypeTable implements ITable {
  className: 'Table';
  override childNodes: (TableHead | TableRow)[];

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Table';
    this.childNodes = [];
    this.setConfig(config);
  }
}
