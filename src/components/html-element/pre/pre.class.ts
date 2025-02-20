import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypePre } from '../../../core/type-html/pre/pre.abstract';
import type { IPre } from './pre.interface';

export class Pre extends TypePre implements IPre {
  className: 'Pre';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Pre';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
