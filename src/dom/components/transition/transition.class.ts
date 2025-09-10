import { TypeTransition } from '../../../core/components/type-transition/type-transition.abstract';
import { TypeTransitionProps } from '../../../core/components/type-transition/type-transition.interface';
// import { transformSlot } from '../../../core/helpers/transformSlot';
import type { ITransition, TransitionProps } from './transition.interface';
import { resolveTransitionProps } from './transition.util';

export class Transition extends TypeTransition implements ITransition {
  className: 'Transition';
  override props: TypeTransitionProps<Element>;

  constructor(params: TransitionProps = {}) {
    super(params);
    this.className = 'Transition';
    // todo 在 TypeTransition的 setup 中有添加；
    // transformSlot(this, params.slot); // childNodes parent // 会有2个 content
    this.useParams(params);
    const props = resolveTransitionProps(params);
    this.props = this.useParams(props); // dom 操作 nodeName = fragment
  }
}
