import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeRp } from '../../../core/type-html/rp/rp.abstract';
import type { IRp } from './rp.interface';

export class Rp extends TypeRp implements IRp {
  className: 'Rp';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Rp';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
