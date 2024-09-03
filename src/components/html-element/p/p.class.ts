import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeP } from '../../type-html/p/p.abstract';
import type { IP } from './p.interface';

export class P extends TypeP implements IP {
  className: 'P';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'P';
    this.setParams(params);
  }
}
