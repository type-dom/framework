// 对应 BaseTransition
import { TypeNode } from '../../type-node/type-node.abstract';
import { RendererElement } from '../../renderer/renderer';
import {
  ITypeFragment,
  FragmentProps,
} from '../type-fragment/type-fragment.interface';
import { enterCbKey, leaveCbKey } from './type-transition.use';

export interface ITypeTransition extends ITypeFragment {
  props: TypeTransitionProps;
}

export type Hook<T = () => void> = T | T[];

/**
 * 定义了过渡阶段的事件接口。
 *
 * 这个接口包括了进入（enter）、离开（leave）和出现（appear）三个阶段的各个时刻的事件。
 * 每个阶段都有before、after和cancelled（取消）四个时刻，供用户在不同的时刻插入自定义逻辑。
 */
export interface TypeTransitionProps
  extends FragmentProps {
  mode?: 'in-out' | 'out-in' | 'default';
  appear?: boolean;

  // If true, indicates this is a transition that doesn't actually insert/remove
  // the element, but toggles the show / hidden status instead.
  // The transition hooks are injected, but will be skipped by the renderer.
  // Instead, a custom directive can control the transition by calling the
  // injected hooks (e.g. v-show).
  persisted?: boolean;

  // Hooks. Using camel case for easier usage in render functions & JSX.
  // In templates these can be written as @before-enter="xxx" as prop names
  // are camelized.
  // 在进入阶段之前触发的事件
  onBeforeEnter?: Hook<(el?: Element) => void>;
  // 在进入阶段完成时触发的事件
  onEnter?: Hook<(el?: Element, done?: () => void) => void>;
  // 在进入阶段之后触发的事件
  onAfterEnter?: Hook<(el?: Element) => void>;
  // 在进入阶段被取消时触发的事件
  onEnterCancelled?: Hook<(el?: Element) => void>;
  // leave
  // 在离开阶段之前触发的事件
  onBeforeLeave?: Hook<(el?: Element) => void>;
  // 在离开阶段完成时触发的事件
  onLeave?: Hook<(el?: Element, done?: () => void) => void>;
  // 在离开阶段之后触发的事件
  onAfterLeave?: Hook<(el?: Element) => void>;
  // 在离开阶段被取消时触发的事件
  onLeaveCancelled?: Hook<(el?: Element) => void>; // only fired in persisted mode
  // appear
  // 在出现阶段之前触发的事件
  onBeforeAppear?: Hook<(el?: Element) => void>;
  // 在出现阶段完成时触发的事件
  onAppear?: Hook<(el?: Element, done?: () => void) => void>;
  // 在出现阶段之后触发的事件
  onAfterAppear?: Hook<(el?: Element) => void>;
  // 在出现阶段被取消时触发的事件
  onAppearCancelled?: Hook<(el?: Element) => void>;
}

export interface TransitionHooks<HostElement = RendererElement> {
  mode: TypeTransitionProps['mode'];
  persisted: boolean;

  beforeEnter(el: HostElement): void;

  enter(el: HostElement): void;

  leave(el: HostElement, remove: () => void): void;

  clone(vnode: TypeNode): TransitionHooks<HostElement>;

  // optional
  afterLeave?(): void;

  delayLeave?(
    el: HostElement,
    earlyRemove: () => void,
    delayedLeave: () => void
  ): void;

  delayedLeave?(): void;
}

export type TransitionHookCaller = <T extends any[] = [el: any]>(
  hook: Hook<(...args: T) => void> | undefined,
  args?: T
) => void;

export type PendingCallback = (cancelled?: boolean) => void;

export interface TransitionState {
  isMounted: boolean;
  isLeaving: boolean;
  isUnmounting: boolean;
  // Track pending leave callbacks for children of the same key.
  // This is used to force remove leaving a child when a new copy is entering.
  leavingVNodes: Map<any, Record<string, TypeNode>>;
}

export interface TransitionElement extends HTMLElement {
  // in persisted mode (e.g. v-show), the same element is toggled, so the
  // pending enter/leave callbacks may need to be cancelled if the state is toggled
  // before it finishes.
  [enterCbKey]?: PendingCallback;
  [leaveCbKey]?: PendingCallback;
}
