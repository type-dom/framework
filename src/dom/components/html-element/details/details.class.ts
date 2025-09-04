import { TypeDetails } from '../../../../core/components/type-html/details/details.abstract';
import { TypeDetailsProps } from '../../../../core/components/type-html/details/details.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IDetails } from './details.interface';

export class Details extends TypeDetails implements IDetails {
  className: 'Details';

  override isBasic = true;

  constructor(params: TypeDetailsProps = {}) {
    super();
    this.className = 'Details';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
