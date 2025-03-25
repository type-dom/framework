import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeBdo } from '../../../core/type-html/bdo/bdo.abstract';
import type { IBdo } from './bdo.interface';

export class Bdo extends TypeBdo implements IBdo {
  className: 'Bdo';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Bdo';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
