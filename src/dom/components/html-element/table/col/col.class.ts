import { TypeTableCol } from '../../../../../core/components/type-html/table/col/col.abstract';
import { TableColProps } from '../../../../../core/components/type-html/table/col/col.interface';
import { transformSlot } from '../../../../../core/helpers/transformSlot';
import type { ITableCol } from './col.interface';

export class TableCol extends TypeTableCol implements ITableCol {
  className: 'TableCol';

  override isBasic = true;

  constructor(params: TableColProps = {}) {
    super(params);
    this.className = 'TableCol';
    transformSlot(this, params.slot);
  }
}
