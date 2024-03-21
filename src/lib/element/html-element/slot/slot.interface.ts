import type { ITypeSlot } from '../../../type-element/type-html/slot/slot.interface';
import { ITypeConfig } from '../../../type-node/type-node.interface';

export interface ISlot extends ITypeSlot {
  className: 'Slot';
}

export interface ISlotConfig extends ITypeConfig {
  slotName: string,
}
