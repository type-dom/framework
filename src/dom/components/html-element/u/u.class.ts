import { TypeU } from '../../../../core/components/type-html/u/u.abstract';
import { UProps } from '../../../../core/components/type-html/u/u.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IU } from './u.interface';

export class U extends TypeU implements IU {
  className: 'U';
  override isBasic = true;

  constructor(params: UProps = {}) {
    super(params);
    this.className = 'U';
    transformSlot(this, params.slot);
  }
}
