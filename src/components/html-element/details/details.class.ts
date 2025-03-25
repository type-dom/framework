import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeDetails } from '../../../core/type-html/details/details.abstract';
import type { IDetails } from './details.interface';

export class Details extends TypeDetails implements IDetails {
  className: 'Details';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Details';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
