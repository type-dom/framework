import { TypeFragment } from '../../core/type-fragment/type-fragment.abstract';
import { IFragment, IFragmentConfig } from './fragment.interface';

export class Fragment extends TypeFragment implements IFragment {
  className: 'Fragment';

  constructor(params: IFragmentConfig = {}) {
    super();
    this.className = 'Fragment';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
