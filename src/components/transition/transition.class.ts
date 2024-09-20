import { TypeTransition } from '../../core/type-transition/type-transition.abstract';
import type { ITransition, ITransitionConfig } from './transition.interface';

export class Transition extends TypeTransition implements ITransition {
  className: 'Transition';

  constructor(params?: ITransitionConfig) {
    super(params);
    this.className = 'Transition';
  }
}
