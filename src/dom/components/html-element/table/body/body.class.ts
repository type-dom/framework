import { TypeTableBody } from '../../../../../core/abstracts/type-html/table/body/body.abstract';
import { TableBodyProps } from '../../../../../core/abstracts/type-html/table/body/body.interface';
import type { ITableBody } from './body.interface';

export class TableBody extends TypeTableBody implements ITableBody {
  className: 'TableBody';
  constructor(params: TableBodyProps) {
    super(params);
    this.className = 'TableBody';
  }
}
