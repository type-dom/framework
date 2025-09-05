import { TypeFragment } from '../../../core/components/type-fragment/type-fragment.abstract';
import { transformSlot } from '../../../core/helpers/transformSlot';
import { IFragment, FragmentProps } from './fragment.interface';

export class Fragment extends TypeFragment implements IFragment {
  className: 'Fragment';

  constructor(params: FragmentProps = {}) {
    super();
    this.className = 'Fragment';
    transformSlot(this, params.slot ?? params.slots?.default);
    this.useParams(params);
  }
}
