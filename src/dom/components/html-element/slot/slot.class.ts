import { TypeSlot } from '../../../../core/components/type-html/slot/slot.abstract';
import { SlotProps } from '../../../../core/components/type-html/slot/slot.interface';
import type { ISlot } from './slot.interface';

export class Slot extends TypeSlot implements ISlot {
  className: 'Slot';
  override isBasic = true;

  constructor(params: SlotProps = {}) {
    super(params);
    this.className = 'Slot';
  }
}
