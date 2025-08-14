import { TypeDetails } from '../../../core/type-html/details/details.abstract';
import { TypeDetailsProps } from '../../../core/type-html/details/details.interface';
import type { IDetails } from './details.interface';

export class Details extends TypeDetails implements IDetails {
  className: 'Details';

  override isBasic = true;

  constructor(params: TypeDetailsProps = {}) {
    super();
    this.className = 'Details';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
