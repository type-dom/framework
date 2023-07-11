import { TypeHtml } from '../type-html.abstract';
import { ITypeSlot } from './slot.interface';
export abstract class TypeSlot extends TypeHtml implements ITypeSlot {
  nodeName: 'slot';
  dom: HTMLSlotElement;
  protected constructor() {
    super('slot');
    this.nodeName = 'slot';
    this.dom = document.createElement(this.nodeName);
  }
}
