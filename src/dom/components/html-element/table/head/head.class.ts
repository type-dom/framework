import { TypeTableHead } from '../../../../../core/components/type-html/table/head/head.abstract';
import { TableHeadProps } from '../../../../../core/components/type-html/table/head/head.interface';
import { transformSlot } from '../../../../../core/helpers/transformSlot';
import type { ITableHead } from './head.interface';

// 表格页眉
export class TableHead extends TypeTableHead implements ITableHead {
  className: 'TableHead';

  override isBasic = true;

  constructor(params: TableHeadProps = {}) {
    super(params);
    this.className = 'TableHead';
    transformSlot(this, params.slot);
  }
}
