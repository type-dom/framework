import type { ITypeTableBody } from '../../../../type-html/table/body/body.interface';
import { ITypeConfig } from '../../../../type-node/type-node.interface';
import type { ITableRow } from '../row/row.interface';
import { Table } from '../table.class';

export interface ITableBody extends ITypeTableBody {
  className: 'TableBody';
  childNodes: ITableRow[];
}

export interface ITableBodyConfig extends ITypeConfig {
  parent?: Table;
}
