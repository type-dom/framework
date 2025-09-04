import { TypeRp } from '../../../../core/components/type-html/rp/rp.abstract';
import { TypeRpProps } from '../../../../core/components/type-html/rp/rp.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IRp } from './rp.interface';

export class Rp extends TypeRp implements IRp {
  className: 'Rp';

  override isBasic = true;

  constructor(params: TypeRpProps = {}) {
    super();
    this.className = 'Rp';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
