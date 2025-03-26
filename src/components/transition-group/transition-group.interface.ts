import { TransitionProps } from '../transition/transition.interface';

export type TransitionGroupProps = Omit<TransitionProps, 'mode'> & {
  tag?: string
  moveClass?: string
}
