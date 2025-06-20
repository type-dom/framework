import { TypeTableBody } from '../../../../core/type-html/table/body/body.abstract';
import type { ITableBody, TableBodyProps } from './body.interface';

export class TableBody extends TypeTableBody implements ITableBody {
  className: 'TableBody';

  override isBasic = true;

  constructor(params: TableBodyProps) {
    super();
    this.className = 'TableBody';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
