import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeVar } from '../../../core/type-html/var/var.abstract';
import type { IVar } from './var.interface';

export class Var extends TypeVar implements IVar {
  className: 'Var';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Var';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
