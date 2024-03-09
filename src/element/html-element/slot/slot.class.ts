import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeSlot } from '../../../type-element/type-html/slot/slot.abstract';
import type { ISlot, ISlotConfig } from './slot.interface';

export class Slot extends TypeSlot implements ISlot {
  className: 'Slot';
  declare parent?: TypeHtml;

  constructor(config?: Partial<ISlotConfig>) {
    super();
    this.className = 'Slot';
    this.setConfig(config);
  }
}
