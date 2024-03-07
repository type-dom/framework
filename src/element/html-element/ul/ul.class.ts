import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeUL } from '../../../type-element/type-html/ul/ul.abstract';
import type { IUL } from './ul.interface';

export class UL extends TypeUL implements IUL {
  className: 'UL';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'UL';
  }
}
