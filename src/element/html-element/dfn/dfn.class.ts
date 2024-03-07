import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeDfn } from '../../../type-element/type-html/dfn/dfn.abstract';
import type { IDfn } from './dfn.interface';

export class Dfn extends TypeDfn implements IDfn {
  className: 'Dfn';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Dfn';
  }
}
