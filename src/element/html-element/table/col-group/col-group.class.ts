import { TypeTableColGroup } from '../../../../type-element/type-html/table/col-group/col-group.abstract';
import { Table } from '../table.class';
import { ITableColGroup } from './col-group.interface';
export class TableColGroup extends TypeTableColGroup implements ITableColGroup {
  className: 'TableColGroup';
  constructor(public parent: Table) {
    super();
    this.className = 'TableColGroup';
    this.childNodes = [];
  }
}
