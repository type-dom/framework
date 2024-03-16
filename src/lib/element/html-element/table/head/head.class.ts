import { TypeTableHead } from '../../../../type-element/type-html/table/head/head.abstract';
import { TableHeaderCell } from '../header-cell/header-cell.class';
import { Table } from '../table.class';
import type { ITableHead } from './head.interface';

// 表格页眉
export class TableHead extends TypeTableHead implements ITableHead {
  className: 'TableHead';
  declare childNodes: TableHeaderCell[];

  constructor(public override parent: Table) {
    super();
    this.className = 'TableHead';
    this.childNodes = [];
  }
}
