import type { ITypeSlot } from '../../../type-element/type-html/slot/slot.interface';
import { ITypeConfig } from '../../../config.interface';

export interface ISlot extends ITypeSlot {
  className: 'Slot';
}

export interface ISlotConfig extends ITypeConfig {
  slotName: string,
}
