import { isArray } from '@type-dom/utils';
import { warn } from '../../../core/warning';
import { onBeforeUnmount, onMounted } from '../../apiLifecycle';
import { TypeNode } from '../../type-node/type-node.abstract';
import { callWithAsyncErrorHandling, ErrorCodes } from '../../errorHandling';
import { isSameNodeType } from '../../helpers/isSameVNodeType';
import { NodeName } from '../../enums';
import {
  Hook,
  TransitionElement,
  TransitionHookCaller,
  TransitionHooks,
  TransitionState,
  TypeTransitionProps,
} from './type-transition.interface';

export const leaveCbKey = Symbol('_leaveCb');
export const enterCbKey = Symbol('_enterCb');

export function useTransitionState(): TransitionState {
  const state: TransitionState = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: new Map(),
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}

const TransitionHookValidator = [Function, Array];

export const BaseTransitionPropsValidators: Record<string, any> = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: TransitionHookValidator,
  onEnter: TransitionHookValidator,
  onAfterEnter: TransitionHookValidator,
  onEnterCancelled: TransitionHookValidator,
  // leave
  onBeforeLeave: TransitionHookValidator,
  onLeave: TransitionHookValidator,
  onAfterLeave: TransitionHookValidator,
  onLeaveCancelled: TransitionHookValidator,
  // appear
  onBeforeAppear: TransitionHookValidator,
  onAppear: TransitionHookValidator,
  onAfterAppear: TransitionHookValidator,
  onAppearCancelled: TransitionHookValidator,
};

// todo
// const recursiveGetSubtree = (instance: TypeNode): TypeNode => {
//   const subTree = instance; // .subTree
//   // return subTree.component ? recursiveGetSubtree(subTree.component) : subTree
//   return instance;
// };

export function findNonCommentChild(children: TypeNode[]): TypeNode {
  let child: TypeNode = children[0];
  if (children.length > 1) {
    let hasFound = false;
    // locate first non-comment child
    for (const c of children) {
      if (c.baseProps.nodeName !== '#comment') {
        if (/*__DEV__ && */ hasFound) {
          // warn more than one non-comment child
          warn(
            '<transition> can only be used on a single element or component. ' +
              'Use <transition-group> for lists.'
          );
          break;
        }
        child = c;
        hasFound = true;
        /*if (!__DEV__) */
        break;
      }
    }
  }
  return child;
}

export function getLeavingNodesForType(
  state: TransitionState,
  vnode: TypeNode
): Record<string, TypeNode> {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.baseProps.nodeName)!;
  if (!leavingVNodesCache) {
    leavingVNodesCache = Object.create(null);
    leavingVNodes.set(vnode.baseProps.nodeName, leavingVNodesCache);
  }
  return leavingVNodesCache;
}

// The transition hooks are attached to the vnode as vnode.transition
// and will be called at appropriate timing in the renderer.
export function resolveTransitionHooks(
  vnode: TypeNode,
  props: TypeTransitionProps<Element>,
  state: TransitionState,
  instance: TypeNode,
  postClone?: (hooks: TransitionHooks) => void
): TransitionHooks {
  // console.warn('resolveTransitionHooks. vnode is ', vnode);
  const {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled,
  } = props;
  const key = String(vnode.uid);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);

  const callHook: TransitionHookCaller = (hook, args) => {
    if (hook) {
      callWithAsyncErrorHandling(
        hook,
        instance,
        ErrorCodes.TRANSITION_HOOK,
        args
      );
    }
  };

  const callAsyncHook = (
    hook: Hook<(el: any, done: () => void) => void>,
    args: [TransitionElement, () => void]
  ) => {
    const done = args[1];
    callHook(hook, args);
    if (isArray(hook)) {
      if (hook.every((hook) => hook.length <= 1)) done();
    } else if (hook.length <= 1) {
      done();
    }
  };

  const hooks: TransitionHooks<TransitionElement> = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      // for same element (v-show)
      if (el[leaveCbKey]) {
        el[leaveCbKey](true /* cancelled */);
      }
      // for toggled element with same key (v-if)
      const leavingVNode = leavingVNodesCache[key];
      if (
        leavingVNode &&
        isSameNodeType(vnode, leavingVNode) &&
        (leavingVNode.dom as TransitionElement as any)[leaveCbKey]
      ) {
        // force early removal (not cancelled)
        (leavingVNode.dom as TransitionElement as any)[leaveCbKey]!();
      }
      callHook(hook, [el]);
    },

    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = (el[enterCbKey] = (cancelled?: any) => {
        if (called) return;
        called = true;
        if (cancelled) {
          callHook(cancelHook, [el]);
        } else {
          callHook(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el[enterCbKey] = undefined;
      });
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },

    leave(el, remove) {
      if (!el) {
        // console.error('el is undefined');
        return;
      }
      const key = String(vnode.uid);
      if (el[enterCbKey]) {
        el[enterCbKey](true /* cancelled */);
      }
      if (state.isUnmounting) {
        return remove();
      }
      callHook(onBeforeLeave, [el]);
      let called = false;
      const done = (el[leaveCbKey] = (cancelled?: any) => {
        if (called) return;
        called = true;
        remove();
        if (cancelled) {
          callHook(onLeaveCancelled, [el]);
        } else {
          callHook(onAfterLeave, [el]);
        }
        el[leaveCbKey] = undefined;
        if (leavingVNodesCache[key] === vnode) {
          delete leavingVNodesCache[key];
        }
      });
      leavingVNodesCache[key] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },

    clone(vnode) {
      const hooks = resolveTransitionHooks(
        vnode,
        props,
        state,
        instance,
        postClone
      );
      if (postClone) postClone(hooks);
      return hooks;
    },
  };

  return hooks;
}

// the placeholder really only handles one special case: KeepAlive
// in the case of a KeepAlive in a leave phase we need to return a KeepAlive
// placeholder with empty content to avoid the KeepAlive instance from being
// unmounted.
export function emptyPlaceholder(vnode: TypeNode): TypeNode | undefined {
  // if (isKeepAlive(vnode)) {
  //   vnode = cloneVNode(vnode)
  //   vnode.children = null
  return vnode;
  // }
}

export function getInnerChild(vnode: TypeNode): TypeNode | undefined {
  // if (!isKeepAlive(vnode)) {
  //   if (isTeleport(vnode.type) && vnode.children) {
  //     return findNonCommentChild(vnode.children as VNode[])
  //   }
  //
  //   return vnode
  // }
  // #7121 ensure get the child component subtree in case
  // it's been replaced during HMR
  // if (__DEV__ && vnode.component) {
  //   return vnode.component.subTree
  // }

  // const { /*shapeFlag, */ children } = vnode
  //
  // if (children) {
  //   // if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
  //   //   return (children as VNodeArrayChildren)[0] as VNode
  //   // }
  //
  //   if (
  //     // shapeFlag & ShapeFlags.SLOTS_CHILDREN &&
  //     isFunction((children as any).default)
  //   ) {
  //     return (children as any).default()
  //   }
  // }
  return vnode.childNodes?.[0];
}

export function setTransitionHooks(
  vnode: TypeNode & { transition?: TransitionHooks },
  hooks: TransitionHooks
): void {
  // if (vnode.shapeFlag & ShapeFlags.COMPONENT && vnode.component) {
  //   vnode.transition = hooks
  //   setTransitionHooks(vnode.component.subTree, hooks)
  // } else if (__FEATURE_SUSPENSE__ && vnode.shapeFlag & ShapeFlags.SUSPENSE) {
  //   vnode.ssContent!.transition = hooks.clone(vnode.ssContent!)
  //   vnode.ssFallback!.transition = hooks.clone(vnode.ssFallback!)
  // } else {
  vnode.transition = hooks;
  // }
}

export function getTransitionRawChildren(
  children: TypeNode[],
  _keepComment = false
  // parentKey?: TypeNode['key'],
): TypeNode[] {
  if (!children) {
    return [];
  }
  let ret: TypeNode[] = [];
  // let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    // // #5360 inherit parent key in case of <template v-for>
    // const key =
    //   parentKey == null
    //     ? child.key
    //     : String(parentKey) + String(child.key != null ? child.key : i)
    // // handle fragment children case, e.g. v-for
    // if (child.baseProps.nodeName === NodeName.FRAGMENT) {
    //   // if (child.patchFlag & PatchFlags.KEYED_FRAGMENT) keyedFragmentCount++
    //   ret = ret.concat(
    //     getTransitionRawChildren(child.children as TypeNode[], keepComment, key),
    //   )
    // }
    // // comment placeholders should be skipped, e.g. v-if
    // else if (keepComment || child.baseProps.nodeName !== 'comment') {
    //   // ret.push(key != null ? cloneVNode(child, { key }) : child)
    // }
    if (child.baseProps.nodeName === NodeName.FRAGMENT) {
      ret = ret.concat(getTransitionRawChildren(child.children as TypeNode[]));
    } else {
      ret.push(child);
    }
  }
  // #1126 if a transition children list contains multiple sub fragments, these
  // fragments will be merged into a flat children array. Since each v-for
  // fragment may contain different static bindings inside, we need to de-op
  // these children to force full diffs to ensure correct behavior.
  // if (keyedFragmentCount > 1) {
  //   for (let i = 0; i < ret.length; i++) {
  //     // ret[i].patchFlag = PatchFlags.BAIL
  //   }
  // }
  return ret;
}
