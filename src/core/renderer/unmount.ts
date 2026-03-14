// import { setCurrentInstance } from '../component';
import { TypeNode } from '../abstracts/type-node/type-node.abstract';
import { clearEvents } from '../event-emitter/event-emitter';
// import { getTarget } from '../helpers/getNodeContainer';
// import { RendererElement } from './renderer';
import { removeBetween } from './removeBetween';

/**
 * 卸载组件实例
 *
 * 此函数负责完全卸载一个组件实例，包括：
 * 1. 触发 beforeUnmount 生命周期钩子
 * 2. 停止组件范围内的响应式效果
 * 3. 卸载组件的子树
 * 4. 触发 unmounted 生命周期钩子
 * 5. 执行其他清理工作
 * todo Teleport 是否需要单独处理
 * @param instance - 要卸载的组件实例
 // * @param doRemove - 是否从DOM中移除组件元素
 * @param root - 根元素
 */
export function unmount(instance: TypeNode, root?: TypeNode) {
  if (instance.isUnmounted) return;
  instance.beforeUnmount();
  // instance.childNodes?.forEach(child => unmount(child)); // 下面的 splice 会影响遍历；
  for (const child of instance.childNodes ?? []) {
    unmount(child);
  }
  // delete instance.childNodes;
  // element.removeDom();
  clearEvents(instance);
  if (instance.dom) {
    if (instance.dom instanceof DocumentFragment) {
      // renderFragment(instance, instance.dom, false); // todo
      // 清空 DocumentFragment； 如果没有挂载，dom 会有子dom
      if (instance.dom.replaceChildren) {
        instance.dom.replaceChildren();
      }
      if (instance.anchorStart && instance.anchor) {
        removeBetween(instance.anchorStart, instance.anchor);
        instance.anchorStart.remove();
        instance.anchor.remove();
      }
      if (instance.targetStart && instance.targetAnchor) {
        // console.warn('Teleport unmount . ');
        removeBetween(instance.targetStart, instance.targetAnchor);
        instance.targetStart.remove();
        instance.targetAnchor.remove();
        // const target = getTarget(instance) as RendererElement;
        // target?.$node?.unmount();
      }
    } else {
      // 删除DOM
      instance.dom.parentElement?.removeChild?.(instance.dom);
      instance.dom.remove();
    }
    (instance as any).dom = undefined;
  } else {
    console.warn('unmount element.dom is null . ');
  }
  // delete element.props;
  // Reflect.deleteProperty(element, 'props');
  // if (instance.parent) {
  //   instance.parent.childNodes.splice(instance.index, 1);
  // } else {
  //   // console.error('useUnmount element.parent is null . ');
  //   // 没有 parent 要root 遍历删除；
  //   // todo  如果项目没有设置root，则无法删除了。或者有多个root时，可能查找有问题；
  //   //      element.parent 都没有了，还如何获取 element.root ?
  //   const parent = instance.findParent(root, instance);
  //   if (parent?.childNodes) parent.childNodes.splice(parent.childNodes.indexOf(instance), 1);
  // }
  instance.unmounted();
  instance.isUnmounted = true;
  // delete instance.styleObj;
  // delete instance.attrObj;

  // ToDo Message 有问题
  // 遍历所有可枚举属性（包括getter）
  // for (const prop in  instance) {
  //   // console.warn('prop is ', prop);
  //   delete (instance as any)[prop];
  // }
  // instance = undefined as any;

  // setCurrentInstance(null);
}

// export type UnmountFn = (
//   vnode: TypeNode,
//   parentComponent?: TypeNode,
//   // parentSuspense: SuspenseBoundary | null,
//   doRemove?: boolean,
//   optimized?: boolean,
// ) => void
//
// const unmountComponent = (
//   instance: TypeNode,
//   // parentSuspense: SuspenseBoundary | null,
//   doRemove?: boolean,
// ) => {
//   // if (__DEV__ && instance.type.__hmrId) {
//   //   unregisterHMR(instance)
//   // }
//
//   // 从组件实例中解构出生命周期钩子
//   // bum: beforeUnmount 钩子
//   // um: unmounted 钩子
//   const { bum, um, /*m, a*/ } = instance.lifeCycles;
//   // invalidateMount(m)
//   // invalidateMount(a)
//
//   // 执行 beforeUnmount 生命周期钩子
//   // 在组件即将被卸载前调用，可以在这里执行清理工作
//   if (bum) {
//     invokeArrayFns(bum)
//   }
//
//   // if (
//   //   __COMPAT__ &&
//   //   isCompatEnabled(DeprecationTypes.INSTANCE_EVENT_HOOKS, instance)
//   // ) {
//   //   instance.emit('hook:beforeDestroy')
//   // }
//
//   // 停止组件作用域内的响应式效果
//   // scope.stop()
//
//   // 如果组件有异步任务，在这里取消它们
//   // job may be null if a component is unmounted before its async
//   // setup has resolved.
//   // if (job) {
//   //   // so that scheduler will no longer invoke it
//   //   job.flags! |= SchedulerJobFlags.DISPOSED
//   //   unmount(subTree, instance, parentSuspense, doRemove)
//   // }
//
//   // 将 unmounted 钩子加入队列，在渲染完成后执行
//   // 这确保了在DOM更新后再执行卸载后的逻辑
//   if (um) {
//     queuePostRenderEffect(um) //, parentSuspense)
//   }
//
//   // 兼容性处理：触发已废弃的 destroyed 钩子事件
//   if (
//     // __COMPAT__ &&
//     isCompatEnabled(DeprecationTypes.INSTANCE_EVENT_HOOKS, instance)
//   ) {
//     queuePostRenderEffect(
//       () => instance.emit('hook:destroyed'),
//       // parentSuspense,
//     )
//   }
//
//   // 将组件标记为已卸载状态
//   queuePostRenderEffect(() => {
//     instance.isUnmounted = true
//   }) //, parentSuspense)
//
//   // if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
//   //   devtoolsComponentRemoved(instance)
//   // }
// }

