import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeB } from '../../../core/type-html/b/b.abstract';
import type { IB } from './b.interface';

export class B extends TypeB implements IB {
  className: 'B';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'B';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
