import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeEm } from '../../../type-element/type-html/em/em.abstract';
import type { IEm } from './em.interface';

export class Em extends TypeEm implements IEm {
  className: 'Em';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Em';
  }
}
