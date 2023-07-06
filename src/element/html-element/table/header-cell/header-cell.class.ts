import { TypeTableHeaderCell } from '../../../../type-element';
import { TableHead } from '../head/head.class';
import { ITableHeaderCell } from './header-cell.interface';

// 表格表头
export class TableHeaderCell extends TypeTableHeaderCell implements ITableHeaderCell {
  className: 'TableHeaderCell';
  constructor(public parent: TableHead) {
    super();
    this.className = 'TableHeaderCell';
  }
}
