import type {
  ITypeSlot,
  TypeSlotProps,
} from '../../../core/type-html/slot/slot.interface';

export interface ISlot extends ITypeSlot {
  className: 'Slot';
}

export interface SlotProps extends TypeSlotProps {
  slotName: string;
}
