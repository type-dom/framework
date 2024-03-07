import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeSup } from '../../../type-element/type-html/sup/sup.abstract';
import type { ISup } from './sup.interface';

export class Sup extends TypeSup implements ISup {
  className: 'Sup';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Sup';
  }
}
