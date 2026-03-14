import { TypeTableCol } from '../../../../../core/abstracts/type-html/table/col/col.abstract';
import { TableColProps } from '../../../../../core/abstracts/type-html/table/col/col.interface';
import type { ITableCol } from './col.interface';

export class TableCol extends TypeTableCol implements ITableCol {
  className: 'TableCol';
  constructor(params: TableColProps = {}) {
    super(params);
    this.className = 'TableCol';
  }
}
