import { TypeTransition } from '../../core/type-transition/type-transition.abstract';
import type { ITransition, ITransitionConfig } from './transition.interface';

export class Transition extends TypeTransition implements ITransition {
  className: 'Transition';
  constructor(public override config: ITransitionConfig) {
    super(config);
    this.className = 'Transition';
  }
}
