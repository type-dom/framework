import { TypeSlot } from '../../../core/type-html/slot/slot.abstract';
import type { ISlot, ISlotConfig } from './slot.interface';

export class Slot extends TypeSlot implements ISlot {
  className: 'Slot';
  override props: ISlotConfig;

  constructor(params = {} as ISlotConfig) {
    super();
    this.className = 'Slot';
    this.props = this.useParams(params);
  }
}
