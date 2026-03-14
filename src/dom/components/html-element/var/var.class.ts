import { TypeVar } from '../../../../core/abstracts/type-html/var/var.abstract';
import { VarProps } from '../../../../core/abstracts/type-html/var/var.interface';
import type { IVar } from './var.interface';

export class Var extends TypeVar implements IVar {
  className: 'Var';

  constructor(params: VarProps = {}) {
    super(params);
    this.className = 'Var';
  }
}
