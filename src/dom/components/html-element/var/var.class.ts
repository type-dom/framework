import { TypeVar } from '../../../../core/components/type-html/var/var.abstract';
import { TypeVarProps } from '../../../../core/components/type-html/var/var.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IVar } from './var.interface';

export class Var extends TypeVar implements IVar {
  className: 'Var';

  override isBasic = true;

  constructor(params: TypeVarProps = {}) {
    super();
    this.className = 'Var';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
