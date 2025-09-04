import { TypeTableColGroup } from '../../../../../core/components/type-html/table/col-group/col-group.abstract';
import { TypeTableColGroupProps } from '../../../../../core/components/type-html/table/col-group/col-group.interface';
import { transformSlot } from '../../../../../core/helpers/transformSlot';
import type { ITableColGroup } from './col-group.interface';

export class TableColGroup extends TypeTableColGroup implements ITableColGroup {
  className: 'TableColGroup';
  override props: TypeTableColGroupProps;

  override isBasic = true;

  constructor(params: TypeTableColGroupProps = {}) {
    super();
    this.className = 'TableColGroup';
    transformSlot(this, params.slot);
    this.props = this.useParams(params);
  }
}
