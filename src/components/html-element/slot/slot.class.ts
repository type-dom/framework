import { TypeSlot } from '../../../core/type-html/slot/slot.abstract';
import type { ISlot, SlotProps } from './slot.interface';

export class Slot extends TypeSlot implements ISlot {
  className: 'Slot';
  override props: SlotProps;

  override isBasic = true;

  constructor(params = {} as SlotProps) {
    super();
    this.className = 'Slot';
    this.props = this.useParams(params);
  }
}
