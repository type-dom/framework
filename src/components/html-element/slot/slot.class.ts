import { TypeSlot } from '../../type-html/slot/slot.abstract';
import type { ISlot, ISlotConfig } from './slot.interface';

export class Slot extends TypeSlot implements ISlot {
  className: 'Slot';
  override props: ISlotConfig;

  constructor(params?: ISlotConfig) {
    super();
    this.className = 'Slot';
    this.props = this.setParams(params);
  }
}
