import { TypeP } from '../../../../core/abstracts/type-html/p/p.abstract';
import { PProps } from '../../../../core/abstracts/type-html/p/p.interface';
import type { IP } from './p.interface';

export class P extends TypeP implements IP {
  className: 'P';

  constructor(params: PProps = {}) {
    super(params);
    this.className = 'P';
  }
}
