import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeSlot } from '../../../type-element/type-html/slot/slot.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { ISlot } from './slot.interface';
export class Slot extends TypeSlot implements ISlot {
  className: 'Slot';
  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'Slot';
  }
}
