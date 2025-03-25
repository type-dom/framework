import { TypeTable } from '../../../core/type-html/table/table.abstract';
import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TableRow } from './row/row.class';
import { TableHead } from './head/head.class';
import type { ITable } from './table.interface';

export class Table extends TypeTable implements ITable {
  className: 'Table';
  override childNodes: (TableHead | TableRow)[];

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Table';
    this.childNodes = [];
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
