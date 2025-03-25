import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeEm } from '../../../core/type-html/em/em.abstract';
import type { IEm } from './em.interface';

export class Em extends TypeEm implements IEm {
  className: 'Em';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Em';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
