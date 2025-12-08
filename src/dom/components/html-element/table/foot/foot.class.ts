import { TypeTableFoot } from '../../../../../core/components/type-html/table/foot/foot.abstract';
import { TableFootProps } from '../../../../../core/components/type-html/table/foot/foot.interface';
import { transformSlot } from '../../../../../core/helpers/transformSlot';
import type { ITableFoot } from './foot.interface';

export class TableFoot extends TypeTableFoot implements ITableFoot {
  className: 'TableFoot';

  override isBasic = true;

  constructor(params: TableFootProps = {}) {
    super(params);
    this.className = 'TableFoot';
    transformSlot(this, params.slot);
  }
}
