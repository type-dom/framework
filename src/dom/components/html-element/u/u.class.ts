import { TypeU } from '../../../../core/abstracts/type-html/u/u.abstract';
import { UProps } from '../../../../core/abstracts/type-html/u/u.interface';
import type { IU } from './u.interface';

export class U extends TypeU implements IU {
  className: 'U';

  constructor(params: UProps = {}) {
    super(params);
    this.className = 'U';
  }
}
