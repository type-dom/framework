import { TypeTableColGroup } from '../../../../core/type-html/table/col-group/col-group.abstract';
import { TypeTableColGroupProps } from '../../../../core/type-html/table/col-group/col-group.interface';
import type { ITableColGroup } from './col-group.interface';

export class TableColGroup extends TypeTableColGroup implements ITableColGroup {
  className: 'TableColGroup';
  override props: TypeTableColGroupProps;

  override isBasic = true;

  constructor(params: TypeTableColGroupProps = {}) {
    super();
    this.className = 'TableColGroup';
    this.slotChildren(params.slot);
    this.props = this.useParams(params);
  }
}
