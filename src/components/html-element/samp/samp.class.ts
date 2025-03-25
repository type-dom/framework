import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeSamp } from '../../../core/type-html/samp/samp.abstract';
import type { ISamp } from './samp.interface';

export class Samp extends TypeSamp implements ISamp {
  className: 'Samp';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Samp';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
