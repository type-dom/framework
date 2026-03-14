import { TypeSlot } from '../../../../core/abstracts/type-html/slot/slot.abstract';
import { SlotProps } from '../../../../core/abstracts/type-html/slot/slot.interface';
import type { ISlot } from './slot.interface';

export class Slot extends TypeSlot implements ISlot {
  className: 'Slot';

  constructor(params: SlotProps = {}) {
    super(params);
    this.className = 'Slot';
  }
}
