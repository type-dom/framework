import { invokeArrayFns, PatchFlags, ShapeFlags } from '@type-dom/utils';
import { setCurrentInstance } from '../component';
import { TypeElement } from '../type-element/type-element.abstract';
import { TypeNode } from '../type-node/type-node.abstract';
import { clearEvents } from '../event-emitter/event-emitter';
import { invokeVNodeHook, VNodeHook } from '../vnode';
import { DeprecationTypes, isCompatEnabled } from '../compat/compatConfig';
import { queuePostRenderEffect } from './queuePostRenderEffect';
// import { Teleport } from '../../dom';
import { remove } from './remove';
import { unmountChildren } from './unmountChildren';

// todo Teleport 是否需要单独处理
export function unmountMethod(element: TypeNode, root?: TypeElement) {
  element.beforeMount();
  element.childNodes?.forEach(child => unmountMethod(child));
  delete element.childNodes;
  // element.removeDom();
  clearEvents(element);
  if (element.dom) {
    if (element.dom instanceof DocumentFragment) {
      // 清空 DocumentFragment； 如果没有挂载，dom 会有子dom
      if (element.dom.replaceChildren) {
        element.dom.replaceChildren();
      } else {
        while (element.dom.firstChild) {
          element.dom.removeChild(element.dom.firstChild);
        }
      }
      element.dom = undefined;
    } else {
      // 删除DOM
      element.dom.parentElement?.removeChild?.(element.dom);
      element.dom.remove();
      element.dom = undefined;
    }
  } else {
    console.warn('unmount element.dom is null . ');
  }
  // delete element.$options;
  // Reflect.deleteProperty(element, 'props');
  if (element.parent) {
    element.parent.childNodes.splice(element.index, 1);
  } else {
    // console.error('useUnmount element.parent is null . ');
    // 没有 parent 要root 遍历删除；
    // todo  如果项目没有设置root，则无法删除了。或者有多个root时，可能查找有问题；
    //      element.parent 都没有了，还如何获取 element.root ?
    const parent = element.findParent(root, element);
    if (parent?.childNodes) parent.childNodes.splice(parent.childNodes.indexOf(element), 1);
  }
  element.beforeUnmount();
  delete element.styleObj;
  delete element.attrObj;

  // ToDo Message 有问题
  // // 遍历所有可枚举属性（包括getter）
  // for (const prop in  element) {
  //   // console.warn('prop is ', prop);
  //   delete (element as any)[prop];
  // }
  // element = undefined as any;

  setCurrentInstance(null);
}


export type UnmountFn = (
  vnode: TypeNode,
  parentComponent?: TypeNode,
  // parentSuspense: SuspenseBoundary | null,
  doRemove?: boolean,
  optimized?: boolean,
) => void

export const unmount: UnmountFn = (
  vnode,
  parentComponent,
  // parentSuspense,
  doRemove = false,
  optimized = false,
) => {
  const {
    // type,
    props,
    // ref,
    children,
    // dynamicChildren,
    shapeFlag = 0,
    patchFlag,
    // dirs,
    // cacheIndex,
  } = vnode

  if (patchFlag === PatchFlags.BAIL) {
    optimized = false
  }

  // unset ref todo
  // const ref = vnode.props.ref;
  // if (ref != null) {
  //   // pauseTracking()
  //   // setRef(ref, null, parentSuspense, vnode, true)
  //   // resetTracking()
  // }

  // #6593 should clean memo cache when unmount
  // if (cacheIndex != null) {
  //   parentComponent!.renderCache[cacheIndex] = undefined
  // }

  // if (shapeFlag & ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE) {
  //   ;(parentComponent!.ctx as KeepAliveContext).deactivate(vnode)
  //   return
  // }

  // const shouldInvokeDirs = shapeFlag & ShapeFlags.ELEMENT && dirs
  // const shouldInvokeVnodeHook = !isAsyncWrapper(vnode)

  let vnodeHook: VNodeHook | undefined | null
  if (
    // shouldInvokeVnodeHook &&
    (vnodeHook = props && props.onVnodeBeforeUnmount)
  ) {
    invokeVNodeHook(vnodeHook, parentComponent, vnode)
  }

  if (shapeFlag & ShapeFlags.COMPONENT) {
    unmountComponent(vnode, doRemove)
  } else {
    // if (__FEATURE_SUSPENSE__ && shapeFlag & ShapeFlags.SUSPENSE) {
    //   vnode.suspense!.unmount(parentSuspense, doRemove)
    //   return
    // }

    // if (shouldInvokeDirs) {
    //   invokeDirectiveHook(vnode, null, parentComponent, 'beforeUnmount')
    // }

    if (shapeFlag & ShapeFlags.TELEPORT) {
      // ;(vnode.type as typeof TeleportImpl).remove(
      //   vnode,
      //   parentComponent,
      //   parentSuspense,
      //   internals,
      //   doRemove,
      // )
      // todo add Teleport remove method
      // (vnode as Teleport).remove(
      //   vnode,
      //   parentComponent,
      //   // parentSuspense,
      //   // internals,
      //   doRemove,
      // )
    // } else if (
    //   dynamicChildren && // todo ?? slot: () => { signal.get() ? TypeNode : text ...}
    //   // #5154
    //   // when v-once is used inside a block, setBlockTracking(-1) marks the
    //   // parent block with hasOnce: true
    //   // so that it doesn't take the fast path during unmount - otherwise
    //   // components nested in v-once are never unmounted.
    //   !dynamicChildren.hasOnce &&
    //   // #1153: fast path should not be taken for non-stable (v-for) fragments
    //   (type !== Fragment ||
    //     (patchFlag > 0 && patchFlag & PatchFlags.STABLE_FRAGMENT))
    // ) {
    //   // fast path for block nodes: only need to unmount dynamic children.
    //   unmountChildren(
    //     dynamicChildren,
    //     parentComponent,
    //     // parentSuspense,
    //     false,
    //     true,
    //   )
    } else if (
      vnode.dom instanceof DocumentFragment
      // (type === Fragment &&
      //   patchFlag &
      //   (PatchFlags.KEYED_FRAGMENT | PatchFlags.UNKEYED_FRAGMENT)) ||
      // (!optimized && shapeFlag & ShapeFlags.ARRAY_CHILDREN)
    ) {
      unmountChildren(children, parentComponent)
    }

    if (doRemove) {
      remove(vnode)
    }
  }

  if (
    ( // shouldInvokeVnodeHook &&
      (vnodeHook = props && props.onVnodeUnmounted)) // ||
  //  shouldInvokeDirs
  ) {
    queuePostRenderEffect(() => {
      if (vnodeHook) invokeVNodeHook(vnodeHook, parentComponent, vnode)
      // shouldInvokeDirs &&
      // invokeDirectiveHook(vnode, null, parentComponent, 'unmounted')
    }) // , parentSuspense)
  }
}


/**
 * 卸载组件实例
 *
 * 此函数负责完全卸载一个组件实例，包括：
 * 1. 触发 beforeUnmount 生命周期钩子
 * 2. 停止组件范围内的响应式效果
 * 3. 卸载组件的子树
 * 4. 触发 unmounted 生命周期钩子
 * 5. 执行其他清理工作
 *
 * @param instance - 要卸载的组件实例
 * @param doRemove - 是否从DOM中移除组件元素
 */
const unmountComponent = (
  instance: TypeNode,
  // parentSuspense: SuspenseBoundary | null,
  doRemove?: boolean,
) => {
  // if (__DEV__ && instance.type.__hmrId) {
  //   unregisterHMR(instance)
  // }

  // 从组件实例中解构出生命周期钩子
  // bum: beforeUnmount 钩子
  // um: unmounted 钩子
  const { bum, um, /*m, a*/ } = instance.lifeCycles;
  // invalidateMount(m)
  // invalidateMount(a)

  // 执行 beforeUnmount 生命周期钩子
  // 在组件即将被卸载前调用，可以在这里执行清理工作
  if (bum) {
    invokeArrayFns(bum)
  }

  // if (
  //   __COMPAT__ &&
  //   isCompatEnabled(DeprecationTypes.INSTANCE_EVENT_HOOKS, instance)
  // ) {
  //   instance.emit('hook:beforeDestroy')
  // }

  // 停止组件作用域内的响应式效果
  // scope.stop()

  // 如果组件有异步任务，在这里取消它们
  // job may be null if a component is unmounted before its async
  // setup has resolved.
  // if (job) {
  //   // so that scheduler will no longer invoke it
  //   job.flags! |= SchedulerJobFlags.DISPOSED
  //   unmount(subTree, instance, parentSuspense, doRemove)
  // }

  // 将 unmounted 钩子加入队列，在渲染完成后执行
  // 这确保了在DOM更新后再执行卸载后的逻辑
  if (um) {
    queuePostRenderEffect(um) //, parentSuspense)
  }

  // 兼容性处理：触发已废弃的 destroyed 钩子事件
  if (
    // __COMPAT__ &&
    isCompatEnabled(DeprecationTypes.INSTANCE_EVENT_HOOKS, instance)
  ) {
    queuePostRenderEffect(
      () => instance.emit('hook:destroyed'),
      // parentSuspense,
    )
  }

  // 将组件标记为已卸载状态
  queuePostRenderEffect(() => {
    instance.isUnmounted = true
  }) //, parentSuspense)

  // if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
  //   devtoolsComponentRemoved(instance)
  // }
}

