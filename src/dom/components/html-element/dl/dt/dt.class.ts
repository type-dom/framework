import { TypeDT } from '../../../../../core/components/type-html/dl/dt/dt.abstract';
import { DTProps } from '../../../../../core/components/type-html/dl/dt/dt.interface';
import { transformSlot } from '../../../../../core/helpers/transformSlot';
import type { IDT } from './dt.interface';

export class DT extends TypeDT implements IDT {
  className: 'DT';

  override isBasic = true;

  constructor(params: DTProps = {}) {
    super(params);
    this.className = 'DT';
    transformSlot(this, params.slot);
  }
}
