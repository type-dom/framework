
import { getCurrentInstance } from '../../core/instance';
import { TypeFragment } from '../../core/type-fragment/type-fragment.abstract';
import { TypeNode } from '../../core/type-node/type-node.abstract';
import {
  IKeepAlive,
  KeepAliveProps,
  Cache,
  Keys, CacheKey
} from './keep-alive.interface';
import { isSameVNodeType } from '../../core/type-node/type-node.util';
import { watch } from '@type-dom/signals';


export class KeepAlive extends TypeFragment implements IKeepAlive {
  className: 'KeepAlive';

  constructor(params: KeepAliveProps) {
    super();
    this.className = 'KeepAlive';
  }

  override setup() {
    // const instance = getCurrentInstance()!
    // const { props } = instance;
    // // KeepAlive communicates with the instantiated renderer via the
    // // ctx where the renderer passes in its internals,
    // // and the KeepAlive instance exposes activate/deactivate implementations.
    // // The whole point of this is to avoid importing KeepAlive directly in the
    // // renderer to facilitate tree-shaking.
    // // const sharedContext = instance.ctx as KeepAliveContext
    //
    // // if the internal renderer is not registered, it indicates that this is server-side rendering,
    // // for KeepAlive, we just need to render its children
    // // if (__SSR__ && !sharedContext.renderer) {
    // //   return () => {
    // //     const children = slots.default && slots.default()
    // //     return children && children.length === 1 ? children[0] : children
    // //   }
    // // }
    //
    // const cache: Cache = new Map()
    // const keys: Keys = new Set()
    // let current: TypeNode | null = null
    //
    // // if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
    // //   ;(instance as any).__v_cache = cache
    // // }
    //
    // const parentSuspense = instance.suspense
    //
    // // const {
    // //   renderer: {
    // //     p: patch,
    // //     m: move,
    // //     um: _unmount,
    // //     o: { createElement },
    // //   },
    // // } = sharedContext
    // const storageContainer = createElement('div')
    //
    // sharedContext.activate = (
    //   vnode,
    //   container,
    //   anchor,
    //   namespace,
    //   optimized,
    // ) => {
    //   const instance = vnode.component!
    //   move(vnode, container, anchor, MoveType.ENTER, parentSuspense)
    //   // in case props have changed
    //   patch(
    //     instance.vnode,
    //     vnode,
    //     container,
    //     anchor,
    //     instance,
    //     parentSuspense,
    //     namespace,
    //     vnode.slotScopeIds,
    //     optimized,
    //   )
    //   queuePostRenderEffect(() => {
    //     instance.isDeactivated = false
    //     if (instance.a) {
    //       invokeArrayFns(instance.a)
    //     }
    //     const vnodeHook = vnode.props && vnode.props.onVnodeMounted
    //     if (vnodeHook) {
    //       invokeVNodeHook(vnodeHook, instance.parent, vnode)
    //     }
    //   }, parentSuspense)
    //
    //   if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
    //     // Update components tree
    //     devtoolsComponentAdded(instance)
    //   }
    // }
    //
    // sharedContext.deactivate = (vnode: VNode) => {
    //   const instance = vnode.component!
    //   invalidateMount(instance.m)
    //   invalidateMount(instance.a)
    //
    //   move(vnode, storageContainer, null, MoveType.LEAVE, parentSuspense)
    //   queuePostRenderEffect(() => {
    //     if (instance.da) {
    //       invokeArrayFns(instance.da)
    //     }
    //     const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted
    //     if (vnodeHook) {
    //       invokeVNodeHook(vnodeHook, instance.parent, vnode)
    //     }
    //     instance.isDeactivated = true
    //   }, parentSuspense)
    //
    //   if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
    //     // Update components tree
    //     devtoolsComponentAdded(instance)
    //   }
    // }
    //
    // function unmount(vnode: VNode) {
    //   // reset the shapeFlag so it can be properly unmounted
    //   resetShapeFlag(vnode)
    //   _unmount(vnode, instance, parentSuspense, true)
    // }
    //
    // function pruneCache(filter: (name: string) => boolean) {
    //   cache.forEach((vnode, key) => {
    //     const name = getComponentName(vnode.type as ConcreteComponent)
    //     if (name && !filter(name)) {
    //       pruneCacheEntry(key)
    //     }
    //   })
    // }
    //
    // function pruneCacheEntry(key: CacheKey) {
    //   const cached = cache.get(key) as TypeNode
    //   if (cached && (!current || !isSameVNodeType(cached, current))) {
    //     unmount(cached)
    //   } else if (current) {
    //     // current active instance should no longer be kept-alive.
    //     // we can't unmount it now but it might be later, so reset its flag now.
    //     resetShapeFlag(current)
    //   }
    //   cache.delete(key)
    //   keys.delete(key)
    // }
    //
    // // prune cache on include/exclude prop change
    // watch(
    //   () => [props.include, props.exclude],
    //   ([include, exclude]) => {
    //     include && pruneCache(name => matches(include, name))
    //     exclude && pruneCache(name => !matches(exclude, name))
    //   },
    //   // prune post-render after `current` has been updated
    //   { flush: 'post', deep: true },
    // )
    //
    // // cache sub tree after render
    // let pendingCacheKey: CacheKey | null = null
    // const cacheSubtree = () => {
    //   // fix #1621, the pendingCacheKey could be 0
    //   if (pendingCacheKey != null) {
    //     // if KeepAlive child is a Suspense, it needs to be cached after Suspense resolves
    //     // avoid caching vnode that not been mounted
    //     if (isSuspense(instance.subTree.type)) {
    //       queuePostRenderEffect(() => {
    //         cache.set(pendingCacheKey!, getInnerChild(instance.subTree))
    //       }, instance.subTree.suspense)
    //     } else {
    //       cache.set(pendingCacheKey, getInnerChild(instance.subTree))
    //     }
    //   }
    // }
    // onMounted(cacheSubtree)
    // onUpdated(cacheSubtree)
    //
    // onBeforeUnmount(() => {
    //   cache.forEach(cached => {
    //     const { subTree, suspense } = instance
    //     const vnode = getInnerChild(subTree)
    //     if (cached.type === vnode.type && cached.key === vnode.key) {
    //       // current instance will be unmounted as part of keep-alive's unmount
    //       resetShapeFlag(vnode)
    //       // but invoke its deactivated hook here
    //       const da = vnode.component!.da
    //       da && queuePostRenderEffect(da, suspense)
    //       return
    //     }
    //     unmount(cached)
    //   })
    // })
  }
}
