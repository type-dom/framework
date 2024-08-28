import type { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeP } from '../../../type-html/p/p.abstract';
import type { IP } from './p.interface';

export class P extends TypeP implements IP {
  className: 'P';

  constructor(config?: ITypeConfig) {
    super();
    this.className = 'P';
    this.setConfig(config);
  }
}
