import { TypeSamp } from '../../../../core/components/type-html/samp/samp.abstract';
import { SampProps } from '../../../../core/components/type-html/samp/samp.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ISamp } from './samp.interface';

export class Samp extends TypeSamp implements ISamp {
  className: 'Samp';

  override isBasic = true;

  constructor(params: SampProps = {}) {
    super(params);
    this.className = 'Samp';
    transformSlot(this, params.slot);
  }
}
