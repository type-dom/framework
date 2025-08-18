import { TypeTransition } from '../../../core/components/type-transition/type-transition.abstract';
import { TypeTransitionProps } from '../../../core/components/type-transition/type-transition.interface';
import type { ITransition, TransitionProps } from './transition.interface';
import { resolveTransitionProps } from './transition.util';

export class Transition extends TypeTransition implements ITransition {
  className: 'Transition';
  override props: TypeTransitionProps<Element>;

  constructor(params: TransitionProps = {}) {
    super(params);
    this.className = 'Transition';

    const props = resolveTransitionProps(params);
    this.props = this.useParams(props); // dom 操作 nodeName = fragment
  }
}
