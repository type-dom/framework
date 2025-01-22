// 对应 BaseTransition
import { TypeHtml } from '../type-html/type-html.abstract';
import { TypeSvg } from '../type-svg/type-svg.abstract';
import { TypeElement } from '../type-element/type-element.abstract';
import { TypeNode } from '../type-node/type-node.abstract';
import type { ITypeConfig } from '../type-node/type-node.interface';
import { ITypeFragment, ITypeFragmentConfig } from '../type-fragment/type-fragment.interface';

export interface ITypeTransition extends ITypeFragment {
  className: string;
}

export type Hook<T = () => void> = T | T[];

/**
 * 定义了过渡阶段的事件接口。
 *
 * 这个接口包括了进入（enter）、离开（leave）和出现（appear）三个阶段的各个时刻的事件。
 * 每个阶段都有before、after和cancelled（取消）四个时刻，供用户在不同的时刻插入自定义逻辑。
 */
export interface ITypeTransitionConfig<
  HostElement extends TypeHtml = TypeHtml
> extends ITypeFragmentConfig {
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
  onBeforeEnter?: (el: HostElement) => void;
  // 在进入阶段完成时触发的事件
  onEnter?: (el: HostElement, done?: () => void) => void;
  // 在进入阶段之后触发的事件
  onAfterEnter?: (el: HostElement) => void;
  // 在进入阶段被取消时触发的事件
  onEnterCancelled?: (el: HostElement) => void;
  // leave
  // 在离开阶段之前触发的事件
  onBeforeLeave?: (el: HostElement) => void;
  // 在离开阶段完成时触发的事件
  onLeave?: (el: HostElement, done?: () => void) => void;
  // 在离开阶段之后触发的事件
  onAfterLeave?: (el: HostElement) => void;
  // 在离开阶段被取消时触发的事件
  onLeaveCancelled?: (el: HostElement) => void; // only fired in persisted mode
  // appear
  // 在出现阶段之前触发的事件
  onBeforeAppear?: (el: HostElement) => void;
  // 在出现阶段完成时触发的事件
  onAppear?: (el: HostElement, done?: () => void) => void;
  // 在出现阶段之后触发的事件
  onAfterAppear?: (el: HostElement) => void;
  // 在出现阶段被取消时触发的事件
  onAppearCancelled?: (el: HostElement) => void;

  //   todo
  slot?: TypeHtml; // | TypeSvg; // 只能有一个子节点

  childNodes?: TypeElement[];
}

export interface TransitionHooks<HostElement = TypeElement> {
  mode: ITypeTransitionConfig['mode'];
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

export interface ITransitionState {
  isMounted: boolean;
  isLeaving: boolean;
  isUnmounting: boolean;
  // Track pending leave callbacks for children of the same key.
  // This is used to force remove leaving a child when a new copy is entering.
  // leavingVNodes: Map<any, Record<string, TypeNode>>;
}

const leaveCbKey = Symbol('_leaveCb');
const enterCbKey = Symbol('_enterCb');

export interface ITransitionElement {
  // in persisted mode (e.g. v-show), the same element is toggled, so the
  // pending enter/leave callbacks may need to be cancelled if the state is toggled
  // before it finishes.
  [enterCbKey]?: PendingCallback;
  [leaveCbKey]?: PendingCallback;
}
