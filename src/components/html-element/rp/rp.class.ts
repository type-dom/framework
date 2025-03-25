import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeRp } from '../../../core/type-html/rp/rp.abstract';
import type { IRp } from './rp.interface';

export class Rp extends TypeRp implements IRp {
  className: 'Rp';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Rp';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
