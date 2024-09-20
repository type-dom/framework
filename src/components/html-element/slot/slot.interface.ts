import type { ITypeSlot } from '../../../core/type-html/slot/slot.interface';
import type { ITypeConfig } from '../../../core/type-node/type-node.interface';

export interface ISlot extends ITypeSlot {
  className: 'Slot';
}

export interface ISlotConfig extends ITypeConfig {
  slotName: string;
}
