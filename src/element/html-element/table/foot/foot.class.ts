import { TypeHtml } from '../../../../type-element';
import { TypeTableFoot } from '../../../../type-element';
import { TableRow } from '../row/row.class';
import { ITableFoot } from './foot.interface';

export class TableFoot extends TypeTableFoot implements ITableFoot {
  className: 'TableFoot';
  childNodes: TableRow[];
  constructor(public parent: TypeHtml) {
    super();
    this.className = 'TableFoot';
    this.childNodes = [];
  }
}
