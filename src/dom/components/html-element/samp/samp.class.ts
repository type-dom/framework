import { TypeSamp } from '../../../../core/components/type-html/samp/samp.abstract';
import { TypeSampProps } from '../../../../core/components/type-html/samp/samp.interface';
import type { ISamp } from './samp.interface';

export class Samp extends TypeSamp implements ISamp {
  className: 'Samp';

  override isBasic = true;

  constructor(params: TypeSampProps = {}) {
    super();
    this.className = 'Samp';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
