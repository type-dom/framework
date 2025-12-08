import { TypeP } from '../../../../core/components/type-html/p/p.abstract';
import { PProps } from '../../../../core/components/type-html/p/p.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IP } from './p.interface';

export class P extends TypeP implements IP {
  className: 'P';

  override isBasic = true;

  constructor(params: PProps = {}) {
    super(params);
    this.className = 'P';
    transformSlot(this, params.slot);
  }
}
