import { TypeTableCol } from '../../../../../core/components/type-html/table/col/col.abstract';
import { TypeTableColProps } from '../../../../../core/components/type-html/table/col/col.interface';
import type { ITableCol } from './col.interface';

export class TableCol extends TypeTableCol implements ITableCol {
  className: 'TableCol';
  override props: TypeTableColProps;

  override isBasic = true;

  constructor(params: TypeTableColProps = {}) {
    super();
    this.className = 'TableCol';
    this.slotChildren(params.slot);
    this.props =  this.useParams(params);
  }
}
