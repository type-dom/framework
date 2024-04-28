import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeVar } from '../../../type-element/type-html/var/var.abstract';
import type { IVar } from './var.interface';

export class Var extends TypeVar implements IVar {
  className: 'Var';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Var';
    this.setConfig(config);
  }
}
