import { TypeWbr } from '../../../../core/components/type-html/wbr/wbr.abstract';
import { TypeWbrProps } from '../../../../core/components/type-html/wbr/wbr.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IWbr } from './wbr.interface';

export class Wbr extends TypeWbr implements IWbr {
  className: 'Wbr';

  override isBasic = true;

  constructor(params: TypeWbrProps = {}) {
    super();
    this.className = 'Wbr';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
