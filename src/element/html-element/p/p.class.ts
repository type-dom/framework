import { ITypeConfig } from '../../../config.interface';
import { TypeP } from '../../../type-element/type-html/p/p.abstract';
import type { IP } from './p.interface';

export class P extends TypeP implements IP {
  className: 'P';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'P';
    this.setConfig(config);
  }
}
