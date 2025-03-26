
import { AnyFn, isArray, isRegExp, isString, remove } from '@type-dom/utils';
import { LifecycleHooks } from '../../constants';
import { KeepAlive } from './keep-alive.class';
import { TypeNode } from '../../core/type-node/type-node.abstract';
import { currentInstance } from '../../core/instance';
import { injectHook, onUnmounted } from '../../core/apiLifecycle';

type MatchPattern = string | RegExp | (string | RegExp)[]

export const isKeepAlive = (vnode: TypeNode): boolean =>
  (vnode as any).__isKeepAlive

const decorate = (t: KeepAlive) => {
  // t.__isBuiltIn = true
  return t
}

function matches(pattern: MatchPattern, name: string): boolean {
  if (isArray(pattern)) {
    return pattern.some((p: string | RegExp) => matches(p, name))
  } else if (isString(pattern)) {
    return pattern.split(',').includes(name)
  } else if (isRegExp(pattern)) {
    pattern.lastIndex = 0
    return pattern.test(name)
  }
  /* v8 ignore next */
  return false
}

export function onActivated(
  hook: AnyFn,
  target?: TypeNode | null,
): void {
  registerKeepAliveHook(hook, LifecycleHooks.ACTIVATED, target)
}

export function onDeactivated(
  hook: AnyFn,
  target?: TypeNode | null,
): void {
  registerKeepAliveHook(hook, LifecycleHooks.DEACTIVATED, target)
}

function registerKeepAliveHook(
  hook: AnyFn & { __wdc?: AnyFn }, // Function & { __wdc?: Function },
  type: LifecycleHooks,
  target: TypeNode | null = currentInstance,
) {
  // cache the deactivate branch check wrapper for injected hooks so the same
  // hook can be properly deduped by the scheduler. "__wdc" stands for "with
  // deactivation check".
  const wrappedHook =
    hook.__wdc ||
    (hook.__wdc = () => {
      // only fire the hook if the target instance is NOT in a deactivated branch.
      let current: TypeNode | undefined | null = target
      while (current) {
        if (current.isDeactivated) {
          return
        }
        current = current.parent
      }
      return hook()
    })
  injectHook(type, wrappedHook, target)
  // In addition to registering it on the target instance, we walk up the parent
  // chain and register it on all ancestor instances that are keep-alive roots.
  // This avoids the need to walk the entire component tree when invoking these
  // hooks, and more importantly, avoids the need to track child components in
  // arrays.
  if (target) {
    let current = target.parent
    while (current && current.parent) {
      if (isKeepAlive(current.parent)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current)
      }
      current = current.parent
    }
  }
}

function injectToKeepAliveRoot(
  hook: AnyFn, // Function & { __weh?: Function },
  type: LifecycleHooks,
  target: TypeNode, // ComponentInternalInstance,
  keepAliveRoot: any // ComponentInternalInstance,
) {
  // injectHook wraps the original for error handling, so make sure to remove
  // the wrapped version.
  const injected = injectHook(type, hook, keepAliveRoot, true /* prepend */)
  onUnmounted(() => {
    remove(keepAliveRoot[type]!, injected)
  }, target)
}

function resetShapeFlag(vnode: TypeNode) {
  // bitwise operations to remove keep alive flags
  // vnode.shapeFlag &= ~ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE
  // vnode.shapeFlag &= ~ShapeFlags.COMPONENT_KEPT_ALIVE
}

function getInnerChild(vnode: TypeNode) {
  // return vnode.shapeFlag & ShapeFlags.SUSPENSE ? vnode.ssContent! : vnode
  return vnode;
}
