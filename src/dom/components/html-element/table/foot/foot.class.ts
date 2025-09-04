import { TypeTableFoot } from '../../../../../core/components/type-html/table/foot/foot.abstract';
import { TypeTableFootProps } from '../../../../../core/components/type-html/table/foot/foot.interface';
import { transformSlot } from '../../../../../core/helpers/transformSlot';
import type { ITableFoot } from './foot.interface';

export class TableFoot extends TypeTableFoot implements ITableFoot {
  className: 'TableFoot';
  override props: TypeTableFootProps;

  override isBasic = true;

  constructor(params: TypeTableFootProps = {}) {
    super();
    this.className = 'TableFoot';
    transformSlot(this, params.slot);
    this.props = this.useParams(params);
  }
}
