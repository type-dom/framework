import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypePre } from '../../../core/type-html/pre/pre.abstract';
import type { IPre } from './pre.interface';

export class Pre extends TypePre implements IPre {
  className: 'Pre';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Pre';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
