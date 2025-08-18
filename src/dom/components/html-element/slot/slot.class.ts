import { TypeSlot } from '../../../../core/components/type-html/slot/slot.abstract';
import { TypeSlotProps } from '../../../../core/components/type-html/slot/slot.interface';
import type { ISlot } from './slot.interface';

export class Slot extends TypeSlot implements ISlot {
  className: 'Slot';

  override isBasic = true;

  constructor(params: TypeSlotProps = {}) {
    super();
    this.className = 'Slot';
    this.props = this.useParams(params);
  }
}
