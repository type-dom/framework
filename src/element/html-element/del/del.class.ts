import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeDel } from '../../../type-element/type-html/del/del.abstract';
import type { IDel } from './del.interface';

export class Del extends TypeDel implements IDel {
  className: 'Del';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Del';
  }
}
