import { ITypeTransition, TypeTransitionProps } from '../../core/type-transition/type-transition.interface';

export interface ITransition extends ITypeTransition {
  className: 'Transition' | string;
}

export interface ITransitionOptions {
  duration?: number;
  easing?: string;
  delay?: number;
}

export const TransitionUtil = 'transition';
export const ANIMATION = 'animation';

export type AnimationTypes = typeof TransitionUtil | typeof ANIMATION;

export interface TransitionProps extends TypeTransitionProps<Element> {
  name?: string;
  type?: AnimationTypes;
  css?: boolean;
  duration?: number | { enter: number; leave: number };
  // custom transition classes
  enterFromClass?: string;
  enterActiveClass?: string;
  enterToClass?: string;
  appearFromClass?: string;
  appearActiveClass?: string;
  appearToClass?: string;
  leaveFromClass?: string;
  leaveActiveClass?: string;
  leaveToClass?: string;
}

export interface CSSTransitionInfo {
  type: AnimationTypes | null;
  propCount: number;
  timeout: number;
  hasTransform: boolean;
}

export type AnimationProperties = 'Delay' | 'Duration';
export type StylePropertiesKey =
  | `${AnimationTypes}${AnimationProperties}`
  | `${typeof TransitionUtil}Property`;

export const vtcKey: unique symbol = Symbol('_vtc')

export interface ElementWithTransition extends HTMLElement {
  // _vtc = Vue Transition Classes.
  // Store the temporarily-added transition classes on the element
  // so that we can avoid overwriting them if the element's class is patched
  // during the transition.
  [vtcKey]?: Set<string>
}
