import { TypeS } from '../../../core/type-html/s/s.abstract';
import { TypeSProps } from '../../../core/type-html/s/s.interface';
import type { IS } from './s.interface';

export class S extends TypeS implements IS {
  className: 'S';

  override isBasic = true;

  constructor(params: TypeSProps = {}) {
    super();
    this.className = 'S';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
