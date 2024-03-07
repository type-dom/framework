import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeDL } from '../../../type-element/type-html/dl/dl.abstract';
import type { IDL } from './dl.interface';

export class DL extends TypeDL implements IDL {
  className: 'DL';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'DL';
  }
}
