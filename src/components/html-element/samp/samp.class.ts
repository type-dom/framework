import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeSamp } from '../../../core/type-html/samp/samp.abstract';
import type { ISamp } from './samp.interface';

export class Samp extends TypeSamp implements ISamp {
  className: 'Samp';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Samp';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
