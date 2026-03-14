import { TypeDel } from '../../../../core/abstracts/type-html/del/del.abstract';
import { DelProps } from '../../../../core/abstracts/type-html/del/del.interface';
import type { IDel } from './del.interface';

export class Del extends TypeDel implements IDel {
  className: 'Del';
  constructor(params: DelProps = {}) {
    super(params);
    this.className = 'Del';
  }
}
