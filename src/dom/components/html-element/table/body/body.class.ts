import { TypeTableBody } from '../../../../../core/components/type-html/table/body/body.abstract';
import { TableBodyProps } from '../../../../../core/components/type-html/table/body/body.interface';
import { transformSlot } from '../../../../../core/helpers/transformSlot';
import type { ITableBody } from './body.interface';

export class TableBody extends TypeTableBody implements ITableBody {
  className: 'TableBody';

  override isBasic = true;

  constructor(params: TableBodyProps) {
    super(params);
    this.className = 'TableBody';
    transformSlot(this, params.slot);
  }
}
