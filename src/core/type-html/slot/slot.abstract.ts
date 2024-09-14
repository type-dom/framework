import { TypeHtml } from '../type-html.abstract';
import type { ITypeSlot } from './slot.interface';

export abstract class TypeSlot extends TypeHtml implements ITypeSlot {
  nodeName: 'slot';
  dom: HTMLSlotElement;

  protected constructor() {
    super();
    this.nodeName = 'slot';
    this.dom = document.createElement(this.nodeName);
  }
}
