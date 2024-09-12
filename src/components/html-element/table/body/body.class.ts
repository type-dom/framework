import { TypeTableBody } from '../../../type-html/table/body/body.abstract';
import { TableRow } from '../row/row.class';
import type { ITableBody, ITableBodyConfig } from './body.interface';

export class TableBody extends TypeTableBody implements ITableBody {
  className: 'TableBody';
  override childNodes: TableRow[];

  constructor(params: ITableBodyConfig) {
    super();
    this.className = 'TableBody';
    this.childNodes = [];
    this.setProps(params);
  }
}
