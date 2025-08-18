import { TypeTableFoot } from '../../../../../core/components/type-html/table/foot/foot.abstract';
import { TypeTableFootProps } from '../../../../../core/components/type-html/table/foot/foot.interface';
import type { ITableFoot } from './foot.interface';

export class TableFoot extends TypeTableFoot implements ITableFoot {
  className: 'TableFoot';
  override props: TypeTableFootProps;

  override isBasic = true;

  constructor(params: TypeTableFootProps = {}) {
    super();
    this.className = 'TableFoot';
    this.slotChildren(params.slot);
    this.props = this.useParams(params);
  }
}
