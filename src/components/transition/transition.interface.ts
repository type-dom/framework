import { ITypeTransition, ITypeTransitionConfig } from '../type-transition/type-transition.interface';
import { TypeElement } from '../../core/type-element/type-element.abstract';
import { TypeHtml } from '../type-html/type-html.abstract';
import { TypeSvg } from '../type-svg/type-svg.abstract';

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

export interface ITransitionConfig extends ITypeTransitionConfig<TypeHtml | TypeSvg> {
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

  parent?: TypeElement;
  slot?: TypeHtml | TypeSvg;
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
