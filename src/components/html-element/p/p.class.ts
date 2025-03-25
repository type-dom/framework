import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeP } from '../../../core/type-html/p/p.abstract';
import type { IP } from './p.interface';

export class P extends TypeP implements IP {
  className: 'P';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'P';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
