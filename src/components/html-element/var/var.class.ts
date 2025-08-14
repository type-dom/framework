import { TypeVar } from '../../../core/type-html/var/var.abstract';
import { TypeVarProps } from '../../../core/type-html/var/var.interface';
import type { IVar } from './var.interface';

export class Var extends TypeVar implements IVar {
  className: 'Var';

  override isBasic = true;

  constructor(params: TypeVarProps = {}) {
    super();
    this.className = 'Var';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
