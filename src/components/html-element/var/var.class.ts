import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeVar } from '../../../core/type-html/var/var.abstract';
import type { IVar } from './var.interface';

export class Var extends TypeVar implements IVar {
  className: 'Var';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Var';
    this.useParams(params);
  }
}
