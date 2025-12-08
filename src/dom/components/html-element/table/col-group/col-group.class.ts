import { TypeTableColGroup } from '../../../../../core/components/type-html/table/col-group/col-group.abstract';
import { TableColGroupProps } from '../../../../../core/components/type-html/table/col-group/col-group.interface';
import { transformSlot } from '../../../../../core/helpers/transformSlot';
import type { ITableColGroup } from './col-group.interface';

export class TableColGroup extends TypeTableColGroup implements ITableColGroup {
  className: 'TableColGroup';

  override isBasic = true;

  constructor(params: TableColGroupProps = {}) {
    super(params);
    this.className = 'TableColGroup';
    transformSlot(this, params.slot);
  }
}
