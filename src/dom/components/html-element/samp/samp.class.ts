import { TypeSamp } from '../../../../core/components/type-html/samp/samp.abstract';
import { TypeSampProps } from '../../../../core/components/type-html/samp/samp.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ISamp } from './samp.interface';

export class Samp extends TypeSamp implements ISamp {
  className: 'Samp';

  override isBasic = true;

  constructor(params: TypeSampProps = {}) {
    super();
    this.className = 'Samp';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
