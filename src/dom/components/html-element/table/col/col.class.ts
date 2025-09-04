import { TypeTableCol } from '../../../../../core/components/type-html/table/col/col.abstract';
import { TypeTableColProps } from '../../../../../core/components/type-html/table/col/col.interface';
import { transformSlot } from '../../../../../core/helpers/transformSlot';
import type { ITableCol } from './col.interface';

export class TableCol extends TypeTableCol implements ITableCol {
  className: 'TableCol';
  override props: TypeTableColProps;

  override isBasic = true;

  constructor(params: TypeTableColProps = {}) {
    super();
    this.className = 'TableCol';
    transformSlot(this, params.slot);
    this.props =  this.useParams(params);
  }
}
