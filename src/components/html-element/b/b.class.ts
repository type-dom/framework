import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeB } from '../../../core/type-html/b/b.abstract';
import type { IB } from './b.interface';

export class B extends TypeB implements IB {
  className: 'B';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'B';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
