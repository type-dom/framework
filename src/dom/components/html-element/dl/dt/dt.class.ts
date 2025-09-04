import { TypeDT } from '../../../../../core/components/type-html/dl/dt/dt.abstract';
import { TypeDTProps } from '../../../../../core/components/type-html/dl/dt/dt.interface';
import { transformSlot } from '../../../../../core/helpers/transformSlot';
import type { IDT } from './dt.interface';

export class DT extends TypeDT implements IDT {
  className: 'DT';

  override isBasic = true;

  constructor(params: TypeDTProps = {}) {
    super();
    this.className = 'DT';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
