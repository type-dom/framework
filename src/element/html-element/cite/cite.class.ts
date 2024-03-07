import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeCite } from '../../../type-element/type-html/cite/cite.abstract';
import type { ICite } from './cite.interface';

export class Cite extends TypeCite implements ICite {
  className: 'Cite';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Cite';
  }
}
