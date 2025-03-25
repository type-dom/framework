import { TypeFragment } from '../../core/type-fragment/type-fragment.abstract';
import { IFragment, FragmentProps } from './fragment.interface';

export class Fragment extends TypeFragment implements IFragment {
  className: 'Fragment';

  constructor(params: FragmentProps = {}) {
    super();
    this.className = 'Fragment';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
