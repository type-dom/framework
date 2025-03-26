import { TypeFragment } from '../../core/type-fragment/type-fragment.abstract';
import { IFragment, FragmentProps } from './fragment.interface';

export class Fragment extends TypeFragment implements IFragment {
  className: 'Fragment';

  constructor(params: FragmentProps = {}) {
    super();
    this.className = 'Fragment';
    this.useParams(params);
  }
  override setup() {
    this.slotChildren(this.props.slot); // 保证 child 为 setup 状态，避免 useMount 时被清理；
  }
}
