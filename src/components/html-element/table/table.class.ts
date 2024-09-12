import { TypeTable } from '../../type-html/table/table.abstract';
import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TableRow } from './row/row.class';
import { TableHead } from './head/head.class';
import type { ITable } from './table.interface';

export class Table extends TypeTable implements ITable {
  className: 'Table';
  override childNodes: (TableHead | TableRow)[];

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Table';
    this.childNodes = [];
    if (params?.slot) {
      this.slotChild(params?.slot);
    }
    this.setProps(params);
  }
}
