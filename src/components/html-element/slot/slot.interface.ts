import type { ITypeSlot, ITypeSlotConfig } from '../../../core/type-html/slot/slot.interface';

export interface ISlot extends ITypeSlot {
  className: 'Slot';
}

export interface ISlotConfig extends ITypeSlotConfig {
  slotName: string;
}
