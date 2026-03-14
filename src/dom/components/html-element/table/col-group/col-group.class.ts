import { TypeTableColGroup } from '../../../../../core/abstracts/type-html/table/col-group/col-group.abstract';
import { TableColGroupProps } from '../../../../../core/abstracts/type-html/table/col-group/col-group.interface';
import type { ITableColGroup } from './col-group.interface';

export class TableColGroup extends TypeTableColGroup implements ITableColGroup {
  className: 'TableColGroup';
  constructor(params: TableColGroupProps = {}) {
    super(params);
    this.className = 'TableColGroup';
  }
}
