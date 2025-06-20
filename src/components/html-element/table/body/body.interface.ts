import type { ITypeTableBody } from '../../../../core/type-html/table/body/body.interface';
import { TypeProps } from '../../../../core/type-node/type-node.interface';
import { Table } from '../table.class';

export interface ITableBody extends ITypeTableBody {
  className: 'TableBody';
}

export interface TableBodyProps extends TypeProps {
  parent?: Table;
}
