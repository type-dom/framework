import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeS } from '../../../core/type-html/s/s.abstract';
import type { IS } from './s.interface';

export class S extends TypeS implements IS {
  className: 'S';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'S';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
