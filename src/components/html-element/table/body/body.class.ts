import { TypeTableBody } from '../../../../core/type-html/table/body/body.abstract';
import { TableRow } from '../row/row.class';
import type { ITableBody, TableBodyProps } from './body.interface';

export class TableBody extends TypeTableBody implements ITableBody {
  className: 'TableBody';
  override childNodes: TableRow[];

  override isBasic = true;

  constructor(params: TableBodyProps) {
    super();
    this.className = 'TableBody';
    this.childNodes = [];
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
