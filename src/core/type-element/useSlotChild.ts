import { isArray, isFunction } from '@type-dom/utils';
import { toRaw } from '@type-dom/signals';
import { ISlotRaw } from '../type-node/type-node.interface';
import { TypeNode } from '../type-node/type-node.abstract';
import { TextNode } from '../text-node/text-node.class';
import { TypeElement } from './type-element.abstract';

export function useSlotChild(element: TypeElement, slot: ISlotRaw | ISlotRaw[] | ((arg?: any) => ISlotRaw | ISlotRaw[]), type: 'add' | 'unshift' = 'add') {
  // console.log('slotChild is called . ');
  if (isFunction(slot)) {
    const el = slot();
    element.slotChild(el);
  } else if (isArray(slot)) {
    slot.forEach((item) => {
      element.slotChild(toRaw(item));
    });
  } else {
    if (type === 'unshift') {
      if (slot instanceof TypeNode) {
        element.unshiftChild(slot);
      } else if (typeof slot === 'string' || typeof slot === 'number') {
        element.unshiftChild(new TextNode(String(slot)));
      } else {
        console.error('useSlotChild: slot is not TypeNode or string or number, it is ', slot);
      }
    } else {
      if (slot instanceof TypeNode) {
        element.addChild(slot);
      } else if (typeof slot === 'string' || typeof slot === 'number') {
        element.addChild(new TextNode(String(slot)));
      } else {
        console.error('useSlotChild: slot is not TypeNode or string or number, it is ', slot);
      }
    }
  }
}
