import { TypePre } from '../../../../core/components/type-html/pre/pre.abstract';
import { PreProps } from '../../../../core/components/type-html/pre/pre.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IPre } from './pre.interface';

export class Pre extends TypePre implements IPre {
  className: 'Pre';

  override isBasic = true;

  constructor(params: PreProps = {}) {
    super(params);
    this.className = 'Pre';
    transformSlot(this, params.slot);
  }
}
