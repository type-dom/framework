import { TypeTableBody } from '../../../../../core/components/type-html/table/body/body.abstract';
import { TypeTableBodyProps } from '../../../../../core/components/type-html/table/body/body.interface';
import type { ITableBody } from './body.interface';

export class TableBody extends TypeTableBody implements ITableBody {
  className: 'TableBody';

  override isBasic = true;

  constructor(params: TypeTableBodyProps) {
    super();
    this.className = 'TableBody';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
