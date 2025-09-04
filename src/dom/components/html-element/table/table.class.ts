import { TypeTable } from '../../../../core/components/type-html/table/table.abstract';
import { TypeTableProps } from '../../../../core/components/type-html/table/table.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import { TableRow } from './row/row.class';
import { TableHead } from './head/head.class';
import type { ITable } from './table.interface';

export class Table extends TypeTable implements ITable {
  className: 'Table';
  override childNodes: (TableHead | TableRow)[];

  override isBasic = true;

  constructor(params: TypeTableProps = {}) {
    super();
    this.className = 'Table';
    this.childNodes = [];
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
