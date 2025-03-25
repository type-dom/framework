import type { ITypeTableBody } from '../../../../core/type-html/table/body/body.interface';
import { TypeProps } from '../../../../core/type-node/type-node.interface';
import type { ITableRow } from '../row/row.interface';
import { Table } from '../table.class';

export interface ITableBody extends ITypeTableBody {
  className: 'TableBody';
  childNodes: ITableRow[];
}

export interface TableBodyProps extends TypeProps {
  parent?: Table;
}
