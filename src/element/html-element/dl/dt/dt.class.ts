import { TypeHtml } from '../../../../type-element/type-html/type-html.abstract';
import { TypeDT } from '../../../../type-element/type-html/dl/dt/dt.abstract';
import type { IDT } from './dt.interface';

export class DT extends TypeDT implements IDT {
  className: 'DT';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'DT';
  }
}
