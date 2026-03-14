import { TypeTableFoot } from '../../../../../core/abstracts/type-html/table/foot/foot.abstract';
import { TableFootProps } from '../../../../../core/abstracts/type-html/table/foot/foot.interface';
import type { ITableFoot } from './foot.interface';

export class TableFoot extends TypeTableFoot implements ITableFoot {
  className: 'TableFoot';
  constructor(params: TableFootProps = {}) {
    super(params);
    this.className = 'TableFoot';
  }
}
