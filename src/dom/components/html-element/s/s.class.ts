import { TypeS } from '../../../../core/components/type-html/s/s.abstract';
import { SProps } from '../../../../core/components/type-html/s/s.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IS } from './s.interface';

export class S extends TypeS implements IS {
  className: 'S';

  override isBasic = true;

  constructor(params: SProps = {}) {
    super(params);
    this.className = 'S';
    transformSlot(this, params.slot);
  }
}
