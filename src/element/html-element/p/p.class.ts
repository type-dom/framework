import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeP } from '../../../type-element/type-html/p/p.abstract';
import type { IP } from './p.interface';

export class P extends TypeP implements IP {
  className: 'P';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'P';
  }
}
