import { TypeTransition } from '../../../core/components/type-transition/type-transition.abstract';
// import { TypeTransitionProps } from '../../../core/components/type-transition/type-transition.interface';
// import { transformSlot } from '../../../core/helpers/transformSlot';
import type { ITransition, TransitionProps } from './transition.interface';
import { resolveTransitionProps } from './transition.util';
import { assignProps } from '../../../core';

export class Transition<Props extends TransitionProps = TransitionProps> extends TypeTransition<Props> implements ITransition {
  className: 'Transition';

  constructor(params: Props = {} as Props) {
    super(params);
    this.className = 'Transition';
    // todo 在 TypeTransition的 setup 中有添加；
    // transformSlot(this, params.slot); // childNodes parent // 会有2个 content
    const props = resolveTransitionProps(params) as Props;
    assignProps(this, props); // dom 操作 nodeName = fragment
  }
}
