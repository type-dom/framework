import { TypeTableColGroup } from '../../../../type-element/type-html/table/col-group/col-group.abstract';
import { Table } from '../table.class';
import type { ITableColGroup } from './col-group.interface';

export class TableColGroup extends TypeTableColGroup implements ITableColGroup {
  className: 'TableColGroup';

  constructor(public override parent: Table) {
    super();
    this.className = 'TableColGroup';
    this.childNodes = [];
  }
}
