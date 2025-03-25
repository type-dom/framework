import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeU } from '../../../core/type-html/u/u.abstract';
import type { IU } from './u.interface';

export class U extends TypeU implements IU {
  className: 'U';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'U';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
