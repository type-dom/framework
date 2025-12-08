import { TypeFragment } from '../../../core/components/type-fragment/type-fragment.abstract';
import { FragmentProps } from '../../../core/components/type-fragment/type-fragment.interface';
import { transformSlot } from '../../../core/helpers/transformSlot';
import { IFragment } from './fragment.interface';

export class Fragment extends TypeFragment implements IFragment {
  override className = 'Fragment';

  constructor(params: FragmentProps = {}) {
    super(params);
    transformSlot(this, params.slot ?? params.slots?.default);
  }
}
