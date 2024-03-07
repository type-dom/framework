import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeU } from '../../../type-element/type-html/u/u.abstract';
import type { IU } from './u.interface';

export class U extends TypeU implements IU {
  className: 'U';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'U';
  }
}
