import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeU } from '../../type-html/u/u.abstract';
import type { IU } from './u.interface';

export class U extends TypeU implements IU {
  className: 'U';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'U';
    this.setParams(params);
  }
}
