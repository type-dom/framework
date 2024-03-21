import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeU } from '../../../type-element/type-html/u/u.abstract';
import type { IU } from './u.interface';

export class U extends TypeU implements IU {
  className: 'U';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'U';
    this.setConfig(config);
  }
}
