import { TypeHtml } from '../../../../type-element/type-html/type-html.abstract';
import { TypeDT } from '../../../../type-element/type-html/dl/dt/dt.abstract';
import { XElement } from '../../../x-element/x-element.class';
import type { IDT } from './dt.interface';

export class DT extends TypeDT implements IDT {
  className: 'DT';

  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'DT';
  }
}
