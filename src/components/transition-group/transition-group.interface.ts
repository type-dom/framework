import { TransitionProps } from '../transition/transition.interface';

export interface TransitionGroupProps extends TransitionProps {
  tag?: string,
  moveClass?: string,
}
