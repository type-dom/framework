import { TypeTableHead } from '../../../../../core/abstracts/type-html/table/head/head.abstract';
import { TableHeadProps } from '../../../../../core/abstracts/type-html/table/head/head.interface';
import type { ITableHead } from './head.interface';

// 表格页眉
export class TableHead extends TypeTableHead implements ITableHead {
  className: 'TableHead';
  constructor(params: TableHeadProps = {}) {
    super(params);
    this.className = 'TableHead';
  }
}
