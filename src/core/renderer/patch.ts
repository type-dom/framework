import { TypeNode } from '../type-node/type-node.abstract';
import { ElementNamespace, RendererElement, } from './renderer';
import { isSameVNodeType } from '../vnode';
import { unmount } from './unmount';
import { PatchFlags } from '@type-dom/utils';
// import { popWarningContext, pushWarningContext, warn } from '../warning';
// import { shouldUpdateComponent } from '../componentRenderUtils';
import { nodeOps } from '../../dom/nodeOps'
import { TeleportEndKey } from '../../dom/components/teleport/teleport.util';
// import { queuePostRenderEffect } from './queuePostRenderEffect';

const hostNextSibling = nodeOps.nextSibling;
const hostInsert = nodeOps.insert;
const hostCreateText = nodeOps.createText;
const hostSetText = nodeOps.setText;
const hostCreateComment = nodeOps.createComment;
// const hostRemove = nodeOps.remove;
// const hostSetScopeId = nodeOps.setScopeId;
// const hostSetElementText = nodeOps.setElementText;

// These functions are created inside a closure and therefore their types cannot
// be directly exported. In order to avoid maintaining function signatures in
// two places, we declare them once here and use them inside the closure.
type PatchFn = (
  n1: TypeNode | undefined, // undefined means this is a mount
  n2: TypeNode,
  container?: RendererElement,
  anchor?: Comment | Text,
  parentComponent?: TypeNode,
  // parentSuspense?: SuspenseBoundary | null,
  namespace?: ElementNamespace,
  slotScopeIds?: string[],
  optimized?: boolean,
) => void

// Note: functions inside this closure should use `const xxx = () => {}`
// style in order to prevent being inlined by minifiers.
export const patch: PatchFn = (
  n1,
  n2,
  container,
  anchor = undefined,
  parentComponent = undefined,
  // parentSuspense = null,
  namespace = undefined,
  slotScopeIds = undefined,
  optimized = false, // __DEV__ && isHmrUpdating ? false : !!n2.dynamicChildren,
) => {
  if (n1 === n2) {
    return
  }

  // patching & not same type, unmount old tree
  if (n1 && !isSameVNodeType(n1, n2)) {
    anchor = getNextHostNode(n1) as Comment | Text;
    unmount(n1, parentComponent, true)
    n1 = undefined
  }

  if (n2.patchFlag === PatchFlags.BAIL) {
    optimized = false
    n2.dynamicChildren = null
  }

  const { className } = n2
  switch (className) {
    case 'TextNode':
      processText(n1, n2, container, anchor)
      break
    case 'CommentNode':
      processCommentNode(n1, n2, container, anchor)
      break
    // case Static:
    //   if (n1 == null) {
    //     mountStaticNode(n2, container, anchor, namespace)
    //   } else if (__DEV__) {
    //     patchStaticNode(n1, n2, container, namespace)
    //   }
    //   break
    // case 'Fragment':
    //   processFragment(
    //     n1,
    //     n2,
    //     container,
    //     anchor,
    //     parentComponent,
    //     // parentSuspense,
    //     namespace,
    //     slotScopeIds,
    //     optimized,
    //   )
    //   break
    case 'Teleport':
      // processTeleport(
      //   n1,
      //   n2,
      //   container,
      //   anchor,
      //   parentComponent,
      //   // parentSuspense,
      //   isSVG,
      //   slotScopeIds,
      //   optimized,
      // )
      break;
    default:
      processElement(
        n1,
        n2,
        container,
        anchor,
        parentComponent,
        // parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
      )
      // if (shapeFlag & ShapeFlags.ELEMENT) {
      //   processElement(
      //     n1,
      //     n2,
      //     container,
      //     anchor,
      //     parentComponent,
      //     // parentSuspense,
      //     namespace,
      //     slotScopeIds,
      //     optimized,
      //   )
      // } else if (shapeFlag & ShapeFlags.COMPONENT) {
      //   processComponent(
      //     n1,
      //     n2,
      //     container,
      //     anchor,
      //     parentComponent,
      //     // parentSuspense,
      //     namespace,
      //     slotScopeIds,
      //     optimized,
      //   )
      // } else if (shapeFlag & ShapeFlags.TELEPORT) {
      //   // ;(type as typeof TeleportImpl).process(
      //   //   n1 as TeleportVNode,
      //   //   n2 as TeleportVNode,
      //   //   container,
      //   //   anchor,
      //   //   parentComponent,
      //   //   // parentSuspense,
      //   //   namespace,
      //   //   slotScopeIds,
      //   //   optimized,
      //   //   internals,
      //   // )
      // } else if (__FEATURE_SUSPENSE__ && shapeFlag & ShapeFlags.SUSPENSE) {
      //   // ;(type as typeof SuspenseImpl).process(
      //   //   n1,
      //   //   n2,
      //   //   container,
      //   //   anchor,
      //   //   parentComponent,
      //   //   // parentSuspense,
      //   //   namespace,
      //   //   slotScopeIds,
      //   //   optimized,
      //   //   // internals,
      //   // )
      // } else if (__DEV__) {
      //   warn('Invalid TypeNode type:', type, `(${typeof type})`)
      // }
  }

  // set ref
  // if (ref != null && parentComponent) {
  //   // setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2)
  // } else if (ref == null && n1 && n1.ref != null) {
  //   // setRef(n1.ref, null, parentSuspense, n1, true)
  // }
}

type ProcessTextOrCommentFn = (
  n1: TypeNode | undefined,
  n2: TypeNode,
  container?: RendererElement,
  anchor?: Comment | Text,
) => void


export const processText: ProcessTextOrCommentFn = (n1, n2, container, anchor) => {
  if (n1 == null) {
    hostInsert(
      (n2.dom = hostCreateText(n2.props.nodeValue as string)),
      container as Element,
      anchor as Node | null,
    )
  } else {
    const el = (n2.dom = n1.dom!)
    if (n2.children !== n1.children) {
      hostSetText(el, n2.props.nodeValue as string)
    }
  }
}

export const processCommentNode: ProcessTextOrCommentFn = (
  n1,
  n2,
  container,
  anchor,
) => {
  if (n1 == null) {
    hostInsert(
      (n2.dom = hostCreateComment((n2.props.nodeValue as string) || '')),
      container as Element,
      anchor as Node | null,
    )
  } else {
    // there's no support for dynamic comments
    n2.dom = n1.dom
  }
}

export const processFragment = (
  n1: TypeNode | undefined,
  n2: TypeNode,
  container: RendererElement,
  anchor?: Comment | Text,
  parentComponent?: TypeNode,
  // parentSuspense: SuspenseBoundary | null,
  namespace?: ElementNamespace,
  slotScopeIds?: string[],
  optimized?: boolean,
) => {
  // const fragmentStartAnchor = (n2.el = n1 ? n1.el : hostCreateText(''))!
  // const fragmentEndAnchor = (n2.anchor = n1 ? n1.anchor : hostCreateText(''))!
  //
  // let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2

  // if (
  //   __DEV__ &&
  //   // #5523 dev root fragment may inherit directives
  //   // (isHmrUpdating || patchFlag! & PatchFlags.DEV_ROOT_FRAGMENT)
  // ) {
  //   // HMR updated / Dev root fragment (w/ comments), force full diff
  //   patchFlag = 0
  //   optimized = false
  //   dynamicChildren = null
  // }

  // check if this is a slot fragment with :slotted scope ids
  // if (fragmentSlotScopeIds) {
  //   slotScopeIds = slotScopeIds
  //     ? slotScopeIds.concat(fragmentSlotScopeIds)
  //     : fragmentSlotScopeIds
  // }

  if (n1 == null) {
    // hostInsert(fragmentStartAnchor, container, anchor)
    // hostInsert(fragmentEndAnchor, container, anchor)
    // a fragment can only have array children
    // since they are either generated by the compiler, or implicitly created
    // from arrays.
    // mountChildren(
    //   // #10007
    //   // such fragment like `<></>` will be compiled into
    //   // a fragment which doesn't have a children.
    //   // In this case fallback to an empty array
    //   (n2.children || []) as VNodeArrayChildren,
    //   container,
    //   fragmentEndAnchor,
    //   parentComponent,
    //   parentSuspense,
    //   namespace,
    //   slotScopeIds,
    //   optimized,
    // )
  } else {
    if (
      // patchFlag! > 0 &&
      // patchFlag! & PatchFlags.STABLE_FRAGMENT &&
      // dynamicChildren &&
      // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren
    ) {
      // a stable fragment (template root or <template v-for>) doesn't need to
      // patch children order, but it may contain dynamicChildren.
      // patchBlockChildren(
      //   n1.dynamicChildren,
      //   dynamicChildren,
      //   container,
      //   parentComponent,
      //   parentSuspense,
      //   namespace,
      //   slotScopeIds,
      // )
      // if (__DEV__) {
      //   // necessary for HMR
      //   traverseStaticChildren(n1, n2)
      // } else if (
      //   // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //   //  get moved around. Make sure all root level vnodes inherit el.
      //   // #2134 or if it's a component root, it may also get moved around
      //   // as the component is being moved.
      //   n2.key != null ||
      //   (parentComponent && n2 === parentComponent.subTree)
      // ) {
      //   traverseStaticChildren(n1, n2, true /* shallow */)
      // }
    } else {
      // keyed / unkeyed, or manual fragments.
      // for keyed & unkeyed, since they are compiler generated from v-for,
      // each child is guaranteed to be a block so the fragment will never
      // have dynamicChildren.
      // patchChildren(
      //   n1,
      //   n2,
      //   container,
      //   fragmentEndAnchor,
      //   parentComponent,
      //   parentSuspense,
      //   namespace,
      //   slotScopeIds,
      //   optimized,
      // )
    }
  }
}

// const processComponent = (
//   n1: TypeNode | null,
//   n2: TypeNode,
//   container: RendererElement,
//   anchor: RendererNode | null,
//   parentComponent: TypeNode | null,
//   // parentSuspense: SuspenseBoundary | null,
//   namespace: ElementNamespace,
//   slotScopeIds: string[] | null,
//   optimized: boolean,
// ) => {
//   // n2.slotScopeIds = slotScopeIds
//   if (n1 == null) {
//     // if (n2.shapeFlag & ShapeFlags.COMPONENT_KEPT_ALIVE) {
//     //   // ;(parentComponent!.ctx as KeepAliveContext).activate(
//     //   //   n2,
//     //   //   container,
//     //   //   anchor,
//     //   //   namespace,
//     //   //   optimized,
//     //   // )
//     // } else {
//       mountComponent(
//         n2,
//         container,
//         anchor,
//         parentComponent,
//         // parentSuspense,
//         namespace,
//         optimized,
//       )
//     // }
//   } else {
//     updateComponent(n1, n2, optimized)
//   }
// }

export const processElement = (
  n1: TypeNode | undefined,
  n2: TypeNode,
  container?: RendererElement,
  anchor?: Comment | Text,
  parentComponent?: TypeNode,
  // parentSuspense: SuspenseBoundary | null,
  namespace?: ElementNamespace,
  slotScopeIds?: string[],
  optimized?: boolean,
) => {
  // if (n2.type === 'svg') {
  //   namespace = 'svg'
  // } else if (n2.type === 'math') {
  //   namespace = 'mathml'
  // }

  if (n1 == null) {
    mountElement(
      n2,
      container,
      anchor,
      parentComponent,
      // parentSuspense,
      namespace,
      slotScopeIds,
      optimized,
    )
  } else {
    // const customElement = !!(n1.el && (n1.el as VueElement)._isVueCE)
    //   ? (n1.el as VueElement)
    //   : null
    // try {
    //   if (customElement) {
    //     customElement._beginPatch()
    //   }
    //   patchElement(
    //     n1,
    //     n2,
    //     parentComponent,
    //     parentSuspense,
    //     namespace,
    //     slotScopeIds,
    //     optimized,
    //   )
    // } finally {
    //   if (customElement) {
    //     customElement._endPatch()
    //   }
    // }
  }
}

export const mountElement = (
  vnode: TypeNode,
  container?: RendererElement,
  anchor?: Comment | Text,
  parentComponent?: TypeNode,
  // parentSuspense: TypeNode | null,
  namespace?: ElementNamespace,
  slotScopeIds?: string[],
  optimized?: boolean,
) => {
  // let el: RendererElement
  // let vnodeHook: VNodeHook | undefined | null
  // const { props, shapeFlag, transition, dirs } = vnode
  //
  // el = vnode.el = hostCreateElement(
  //   vnode.type as string,
  //   namespace,
  //   props && props.is,
  //   props,
  // )

  // mount children first, since some props may rely on child content
  // being already rendered, e.g. `<select value>`
  // if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
  //   hostSetElementText(el, vnode.children as string)
  // } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
  //   mountChildren(
  //     vnode.children as VNodeArrayChildren,
  //     el,
  //     null,
  //     parentComponent,
  //     // parentSuspense,
  //     resolveChildrenNamespace(vnode, namespace),
  //     slotScopeIds,
  //     optimized,
  //   )
  // }

  // if (dirs) {
  //   invokeDirectiveHook(vnode, null, parentComponent, 'created')
  // }
  // scopeId
  // setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent)
  // props
  // if (props) {
  //   for (const key in props) {
  //     if (key !== 'value' && !isReservedProp(key)) {
  //       hostPatchProp(el, key, null, props[key], namespace, parentComponent)
  //     }
  //   }
  //   /**
  //    * Special case for setting value on DOM elements:
  //    * - it can be order-sensitive (e.g. should be set *after* min/max, #2325, #4024)
  //    * - it needs to be forced (#1471)
  //    * #2353 proposes adding another renderer option to configure this, but
  //    * the properties affects are so finite it is worth special casing it
  //    * here to reduce the complexity. (Special casing it also should not
  //    * affect non-DOM renderers)
  //    */
  //   if ('value' in props) {
  //     hostPatchProp(el, 'value', null, props.value, namespace)
  //   }
  //   if ((vnodeHook = props.onVnodeBeforeMount)) {
  //     invokeVNodeHook(vnodeHook, parentComponent, vnode)
  //   }
  // }

  // if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
  //   def(el, '__vnode', vnode, true)
  //   def(el, '__vueParentComponent', parentComponent, true)
  // }

  // if (dirs) {
  //   invokeDirectiveHook(vnode, null, parentComponent, 'beforeMount')
  // }
  // #1583 For inside suspense + suspense not resolved case, enter hook should call when suspense resolved
  // #1689 For inside suspense + suspense resolved case, just call it
  // const needCallTransitionHooks = needTransition(parentSuspense, transition)
  // if (needCallTransitionHooks) {
  //   transition!.beforeEnter(el)
  // }
  // hostInsert(el, container, anchor)
  // if (
  //   (vnodeHook = props && props.onVnodeMounted) ||
  //   needCallTransitionHooks ||
  //   dirs
  // ) {
  //   queuePostRenderEffect(() => {
  //     vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode)
  //     needCallTransitionHooks && transition!.enter(el)
  //     dirs && invokeDirectiveHook(vnode, null, parentComponent, 'mounted')
  //   }, parentSuspense)
  // }
}

// export type MountComponentFn = (
//   initialVNode: TypeNode,
//   container: RendererElement,
//   anchor: RendererNode | null,
//   parentComponent: TypeNode | null,
//   // parentSuspense: SuspenseBoundary | null,
//   namespace: ElementNamespace,
//   optimized: boolean,
// ) => void

// const mountComponent: MountComponentFn = (
//   initialVNode,
//   container,
//   anchor,
//   parentComponent,
//   // parentSuspense,
//   namespace: ElementNamespace,
//   optimized,
// ) => {
//   // 2.x compat may pre-create the component instance before actually
//   // mounting
//   // const compatMountInstance =
//   //   __COMPAT__ && initialVNode.isCompatRoot && initialVNode.component
//   // const instance: ComponentInternalInstance =
//   //   compatMountInstance ||
//   //   (initialVNode.component = createComponentInstance(
//   //     initialVNode,
//   //     parentComponent,
//   //     parentSuspense,
//   //   ))
//
//   // if (__DEV__ && instance.type.__hmrId) {
//   //   registerHMR(instance)
//   // }
//
//   // if (__DEV__) {
//   //   pushWarningContext(initialVNode)
//   //   startMeasure(instance, `mount`)
//   // }
//
//   // inject renderer internals for keepAlive
//   // if (isKeepAlive(initialVNode)) {
//   //   ;(instance.ctx as KeepAliveContext).renderer = internals
//   // }
//   //
//   // // resolve props and slots for setup context
//   // if (!(__COMPAT__ && compatMountInstance)) {
//   //   if (__DEV__) {
//   //     startMeasure(instance, `init`)
//   //   }
//   //   setupComponent(instance, false, optimized)
//   //   if (__DEV__) {
//   //     endMeasure(instance, `init`)
//   //   }
//   // }
//
//   // avoid hydration for hmr updating
//   // if (__DEV__ && isHmrUpdating) initialVNode.el = null
//
//   // setup() is async. This component relies on async logic to be resolved
//   // before proceeding
//   // if (__FEATURE_SUSPENSE__ && instance.asyncDep) {
//   //   // parentSuspense &&
//   //   // parentSuspense.registerDep(instance, setupRenderEffect, optimized)
//   //
//   //   // Give it a placeholder if this is not hydration
//   //   // TODO handle self-defined fallback
//   //   if (!initialVNode.el) {
//   //     const placeholder = (instance.subTree = createVNode(Comment))
//   //     processCommentNode(null, placeholder, container!, anchor)
//   //     initialVNode.placeholder = placeholder.el
//   //   }
//   // } else {
//   //   // setupRenderEffect(
//   //   //   instance,
//   //   //   initialVNode,
//   //   //   container,
//   //   //   anchor,
//   //   //   // parentSuspense,
//   //   //   namespace,
//   //   //   optimized,
//   //   // )
//   // }
//   //
//   // if (__DEV__) {
//   //   popWarningContext()
//   //   endMeasure(instance, `mount`)
//   // }
// }

// const updateComponent = (n1: TypeNode, n2: TypeNode, optimized: boolean) => {
//   // const instance = (n2.component = n1.component)!
//   // if (shouldUpdateComponent(n1, n2, optimized)) {
//   //   if (
//   //     // __FEATURE_SUSPENSE__ &&
//   //     instance.asyncDep &&
//   //     !instance.asyncResolved
//   //   ) {
//   //     // async & still pending - just update props and slots
//   //     // since the component's reactive effect for render isn't set-up yet
//   //     // if (__DEV__) {
//   //     //   pushWarningContext(n2)
//   //     // }
//   //     // updateComponentPreRender(instance, n2, optimized)
//   //     // if (__DEV__) {
//   //     //   popWarningContext()
//   //     // }
//   //     return
//   //   } else {
//   //     // normal update
//   //     instance.next = n2
//   //     // instance.update is the reactive effect.
//   //     instance.update()
//   //   }
//   // } else {
//   //   // no update needed. just copy over properties
//   //   n2.dom = n1.dom
//   //   instance.vnode = n2
//   // }
// }


type MountChildrenFn = (
  children: (TypeNode | string)[],
  container: RendererElement,
  anchor: Comment | Text | null,
  parentComponent: TypeNode | null,
  // parentSuspense: SuspenseBoundary | null,
  namespace: ElementNamespace,
  slotScopeIds: string[] | null,
  optimized: boolean,
  start?: number,
) => void

export const mountChildren: MountChildrenFn = (
  children,
  container,
  anchor,
  parentComponent,
  // parentSuspense,
  namespace: ElementNamespace,
  slotScopeIds,
  optimized,
  start = 0,
) => {
  // for (let i = start; i < children.length; i++) {
  //   const child = (children[i] = optimized
  //     ? cloneIfMounted(children[i] as VNode)
  //     : normalizeVNode(children[i]))
  //   patch(
  //     null,
  //     child,
  //     container,
  //     anchor,
  //     parentComponent,
  //     parentSuspense,
  //     namespace,
  //     slotScopeIds,
  //     optimized,
  //   )
  // }
}

export const patchElement = (
  n1: TypeNode,
  n2: TypeNode,
  parentComponent: TypeNode | undefined,
  // parentSuspense: SuspenseBoundary | undefined,
  namespace: ElementNamespace,
  slotScopeIds: string[] | null,
  optimized: boolean,
) => {
  // const el = (n2.el = n1.el!)
  // if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
  //   el.__vnode = n2
  // }
  // let { patchFlag, dynamicChildren, dirs } = n2
  // // #1426 take the old vnode's patch flag into account since user may clone a
  // // compiler-generated vnode, which de-opts to FULL_PROPS
  // patchFlag |= n1.patchFlag & PatchFlags.FULL_PROPS
  // const oldProps = n1.props || EMPTY_OBJ
  // const newProps = n2.props || EMPTY_OBJ
  // let vnodeHook: VNodeHook | undefined | null
  //
  // // disable recurse in beforeUpdate hooks
  // parentComponent && toggleRecurse(parentComponent, false)
  // if ((vnodeHook = newProps.onVnodeBeforeUpdate)) {
  //   invokeVNodeHook(vnodeHook, parentComponent, n2, n1)
  // }
  // if (dirs) {
  //   invokeDirectiveHook(n2, n1, parentComponent, 'beforeUpdate')
  // }
  // parentComponent && toggleRecurse(parentComponent, true)
  //
  // if (__DEV__ && isHmrUpdating) {
  //   // HMR updated, force full diff
  //   patchFlag = 0
  //   optimized = false
  //   dynamicChildren = null
  // }
  //
  // // #9135 innerHTML / textContent unset needs to happen before possible
  // // new children mount
  // if (
  //   (oldProps.innerHTML && newProps.innerHTML == null) ||
  //   (oldProps.textContent && newProps.textContent == null)
  // ) {
  //   hostSetElementText(el, '')
  // }
  //
  // if (dynamicChildren) {
  //   patchBlockChildren(
  //     n1.dynamicChildren!,
  //     dynamicChildren,
  //     el,
  //     parentComponent,
  //     parentSuspense,
  //     resolveChildrenNamespace(n2, namespace),
  //     slotScopeIds,
  //   )
  //   if (__DEV__) {
  //     // necessary for HMR
  //     traverseStaticChildren(n1, n2)
  //   }
  // } else if (!optimized) {
  //   // full diff
  //   patchChildren(
  //     n1,
  //     n2,
  //     el,
  //     null,
  //     parentComponent,
  //     parentSuspense,
  //     resolveChildrenNamespace(n2, namespace),
  //     slotScopeIds,
  //     false,
  //   )
  // }
  //
  // if (patchFlag > 0) {
  //   // the presence of a patchFlag means this element's render code was
  //   // generated by the compiler and can take the fast path.
  //   // in this path old node and new node are guaranteed to have the same shape
  //   // (i.e. at the exact same position in the source template)
  //   if (patchFlag & PatchFlags.FULL_PROPS) {
  //     // element props contain dynamic keys, full diff needed
  //     patchProps(el, oldProps, newProps, parentComponent, namespace)
  //   } else {
  //     // class
  //     // this flag is matched when the element has dynamic class bindings.
  //     if (patchFlag & PatchFlags.CLASS) {
  //       if (oldProps.class !== newProps.class) {
  //         hostPatchProp(el, 'class', null, newProps.class, namespace)
  //       }
  //     }
  //
  //     // style
  //     // this flag is matched when the element has dynamic style bindings
  //     if (patchFlag & PatchFlags.STYLE) {
  //       hostPatchProp(el, 'style', oldProps.style, newProps.style, namespace)
  //     }
  //
  //     // props
  //     // This flag is matched when the element has dynamic prop/attr bindings
  //     // other than class and style. The keys of dynamic prop/attrs are saved for
  //     // faster iteration.
  //     // Note dynamic keys like :[foo]="bar" will cause this optimization to
  //     // bail out and go through a full diff because we need to unset the old key
  //     if (patchFlag & PatchFlags.PROPS) {
  //       // if the flag is present then dynamicProps must be non-null
  //       const propsToUpdate = n2.dynamicProps!
  //       for (let i = 0; i < propsToUpdate.length; i++) {
  //         const key = propsToUpdate[i]
  //         const prev = oldProps[key]
  //         const next = newProps[key]
  //         // #1471 force patch value
  //         if (next !== prev || key === 'value') {
  //           hostPatchProp(el, key, prev, next, namespace, parentComponent)
  //         }
  //       }
  //     }
  //   }
  //
  //   // text
  //   // This flag is matched when the element has only dynamic text children.
  //   if (patchFlag & PatchFlags.TEXT) {
  //     if (n1.children !== n2.children) {
  //       hostSetElementText(el, n2.children as string)
  //     }
  //   }
  // } else if (!optimized && dynamicChildren == null) {
  //   // unoptimized, full diff
  //   patchProps(el, oldProps, newProps, parentComponent, namespace)
  // }
  //
  // if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
  //   queuePostRenderEffect(() => {
  //     vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1)
  //     dirs && invokeDirectiveHook(n2, n1, parentComponent, 'updated')
  //   }, parentSuspense)
  // }
}


type PatchChildrenFn = (
  n1: TypeNode | undefined,
  n2: TypeNode,
  container: RendererElement,
  anchor: Comment | Text | null,
  parentComponent: TypeNode | null,
  // parentSuspense: SuspenseBoundary | null,
  namespace: ElementNamespace,
  slotScopeIds: string[] | null,
  optimized: boolean,
) => void

export const patchChildren: PatchChildrenFn = (
  n1,
  n2,
  container,
  anchor,
  parentComponent,
  // parentSuspense,
  namespace: ElementNamespace,
  slotScopeIds,
  optimized = false,
) => {
  // const c1 = n1 && n1.children
  // const prevShapeFlag = n1 ? n1.shapeFlag : 0
  // const c2 = n2.children
  //
  // const { patchFlag, shapeFlag } = n2
  // // fast path
  // if (patchFlag > 0) {
  //   if (patchFlag & PatchFlags.KEYED_FRAGMENT) {
  //     // this could be either fully-keyed or mixed (some keyed some not)
  //     // presence of patchFlag means children are guaranteed to be arrays
  //     patchKeyedChildren(
  //       c1 as VNode[],
  //       c2 as VNodeArrayChildren,
  //       container,
  //       anchor,
  //       parentComponent,
  //       parentSuspense,
  //       namespace,
  //       slotScopeIds,
  //       optimized,
  //     )
  //     return
  //   } else if (patchFlag & PatchFlags.UNKEYED_FRAGMENT) {
  //     // unkeyed
  //     patchUnkeyedChildren(
  //       c1 as VNode[],
  //       c2 as VNodeArrayChildren,
  //       container,
  //       anchor,
  //       parentComponent,
  //       parentSuspense,
  //       namespace,
  //       slotScopeIds,
  //       optimized,
  //     )
  //     return
  //   }
  // }
  //
  // // children has 3 possibilities: text, array or no children.
  // if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
  //   // text children fast path
  //   if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
  //     unmountChildren(c1 as VNode[], parentComponent, parentSuspense)
  //   }
  //   if (c2 !== c1) {
  //     hostSetElementText(container, c2 as string)
  //   }
  // } else {
  //   if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
  //     // prev children was array
  //     if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
  //       // two arrays, cannot assume anything, do full diff
  //       patchKeyedChildren(
  //         c1 as VNode[],
  //         c2 as VNodeArrayChildren,
  //         container,
  //         anchor,
  //         parentComponent,
  //         parentSuspense,
  //         namespace,
  //         slotScopeIds,
  //         optimized,
  //       )
  //     } else {
  //       // no new children, just unmount old
  //       unmountChildren(c1 as VNode[], parentComponent, parentSuspense, true)
  //     }
  //   } else {
  //     // prev children was text OR null
  //     // new children is array OR null
  //     if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
  //       hostSetElementText(container, '')
  //     }
  //     // mount new if array
  //     if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
  //       mountChildren(
  //         c2 as VNodeArrayChildren,
  //         container,
  //         anchor,
  //         parentComponent,
  //         parentSuspense,
  //         namespace,
  //         slotScopeIds,
  //         optimized,
  //       )
  //     }
  //   }
  // }
}

type NextFn = (vnode: TypeNode) => ChildNode | null;

const getNextHostNode: NextFn = node => {
  // if (vnode.shapeFlag & ShapeFlags.COMPONENT) {
  //   return getNextHostNode(vnode.component!.subTree)
  // }
  // if (__FEATURE_SUSPENSE__ && vnode.shapeFlag & ShapeFlags.SUSPENSE) {
  //   return vnode.suspense!.next()
  // }
  const el = hostNextSibling((node.anchor || node.dom)!)
  // #9071, #9313
  // teleported content can mess up nextSibling searches during patch so
  // we need to skip them during nextSibling search
  const teleportEnd = el && (el as RendererElement)[TeleportEndKey]
  return teleportEnd ? hostNextSibling(teleportEnd) : el
}
