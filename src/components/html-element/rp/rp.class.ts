import { TypeRp } from '../../../core/type-html/rp/rp.abstract';
import { TypeRpProps } from '../../../core/type-html/rp/rp.interface';
import type { IRp } from './rp.interface';

export class Rp extends TypeRp implements IRp {
  className: 'Rp';

  override isBasic = true;

  constructor(params: TypeRpProps = {}) {
    super();
    this.className = 'Rp';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
