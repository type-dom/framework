// import {
//   EMPTY_ARR,
//   PatchFlags,
//   ShapeFlags,
//   SlotFlags,
//   extend,
//   isArray,
//   isFunction,
//   isObject,
//   isOn,
//   isString,
//   normalizeClass,
//   normalizeStyle,
// } from '@vue/shared'
import {
  EMPTY_ARR,
  extend,
  isArray,
  isFunction,
  isObject,
  isOn,
  isString,
  normalizeClass,
  normalizeStyle,
  PatchFlags,
  ShapeFlags,
} from '@type-dom/utils';
// import {
//   type ClassComponent,
//   type Component,
//   type ComponentInternalInstance,
//   type ConcreteComponent,
//   type Data,
//   isClassComponent,
// } from './component'
// import type { RawSlots } from './componentSlots'
// import {
//   type ReactiveFlags,
//   type Ref,
//   isProxy,
//   isRef,
//   toRaw,
// } from '@vue/reactivity'
// import type { AppContext } from './apiCreateApp'
// import {
//   type Suspense,
//   type SuspenseBoundary,
//   type SuspenseImpl,
//   isSuspense,
// } from './components/Suspense'
// import type { DirectiveBinding } from './directives'
import {
  type TransitionHooks,
  // setTransitionHooks,
} from './components/type-transition/type-transition.interface'
// import { warn } from './warning'
// import {
//   type Teleport,
//   type TeleportImpl,
//   isTeleport,
// } from './components/Teleport'
import {
  currentRenderingInstance,
  // currentScopeId,
} from './componentRenderContext'
import type { RendererElement, RendererNode } from './renderer/renderer'
import { NULL_DYNAMIC_COMPONENT } from './helpers/resolveAssets'
// import { hmrDirtyComponents } from './hmr'
// import { convertLegacyComponent } from './compat/component'
// import { convertLegacyVModelProps } from './compat/componentVModel'
// import { defineLegacyVNodeProperties } from './compat/renderFn'
import { ErrorCodes, callWithAsyncErrorHandling } from './errorHandling'
// import type { ComponentPublicInstance } from './componentPublicInstance'
import { isInternalObject } from './internalObject'
import { isRef, /*ReactiveFlags, */ Ref } from '../reactivity';
import { TypeNode } from './type-node/type-node.abstract';
// import { setTransitionHooks } from './components/type-transition/type-transition.use';
import { Data } from './component';
import { AppContext } from '../dom/components/app/app.interface';
// import { TransitionHooks } from './components';

export function isTypeNode(value: any): value is TypeNode {
  // return value ? value.__v_isVNode === true : false
  return value instanceof TypeNode;
}

export const Fragment = Symbol.for('v-fgt') as any as {
  __isFragment: true
  new (): {
    $props: VNodeProps
  }
}
export const Text: unique symbol = Symbol.for('v-txt')
export const Comment: unique symbol = Symbol.for('v-cmt')
export const Static: unique symbol = Symbol.for('v-stc')

export type VNodeTypes =
  | string
  | TypeNode
  // | VNode
  // | Component
  // | typeof Text
  // | typeof Static
  // | typeof Comment
  // | typeof Fragment
  // | typeof Teleport
  // | typeof TeleportImpl
  // | typeof Suspense
  // | typeof SuspenseImpl

export type VNodeRef =
  | string
  | Ref
  | ((
      ref: Element | TypeNode | null,
      refs: Record<string, any>,
    ) => void)

export type VNodeNormalizedRefAtom = {
  /**
   * component instance
   */
  i: TypeNode // ComponentInternalInstance
  /**
   * Actual ref
   */
  r: VNodeRef
  /**
   * setup ref key
   */
  k?: string
  /**
   * refInFor marker
   */
  f?: boolean
}

export type VNodeNormalizedRef =
  | VNodeNormalizedRefAtom
  | VNodeNormalizedRefAtom[]

type VNodeMountHook = (vnode: VNode) => void
type VNodeUpdateHook = (vnode: VNode, oldVNode: VNode) => void
export type VNodeHook =
  | VNodeMountHook
  | VNodeUpdateHook
  | VNodeMountHook[]
  | VNodeUpdateHook[]

// https://github.com/microsoft/TypeScript/issues/33099
export type VNodeProps = {
  key?: PropertyKey
  ref?: VNodeRef
  ref_for?: boolean
  ref_key?: string

  // vnode hooks
  onVnodeBeforeMount?: VNodeMountHook | VNodeMountHook[]
  onVnodeMounted?: VNodeMountHook | VNodeMountHook[]
  onVnodeBeforeUpdate?: VNodeUpdateHook | VNodeUpdateHook[]
  onVnodeUpdated?: VNodeUpdateHook | VNodeUpdateHook[]
  onVnodeBeforeUnmount?: VNodeMountHook | VNodeMountHook[]
  onVnodeUnmounted?: VNodeMountHook | VNodeMountHook[]
}

type VNodeChildAtom =
  | TypeNode
  | string
  | number
  | boolean
  | null
  | undefined
  | void

export type VNodeArrayChildren = Array<VNodeArrayChildren | VNodeChildAtom>

export type VNodeChild = VNodeChildAtom | VNodeArrayChildren

export type VNodeNormalizedChildren =
  | string
  | VNodeArrayChildren
  // | RawSlots
  | null

export interface VNode<
  HostNode = RendererNode,
  HostElement = RendererElement,
  ExtraProps = { [key: string]: any },
> {
  /**
   * @internal
   */
  // __v_isVNode: true

  /**
   * @internal
   */
  // [ReactiveFlags.SKIP]: true

  type: VNodeTypes
  props: (VNodeProps & ExtraProps) | null
  key: PropertyKey | null
  ref: VNodeNormalizedRef | null
  /**
   * SFC only. This is assigned on vnode creation using currentScopeId
   * which is set alongside currentRenderingInstance.
   */
  // scopeId: string | null
  /**
   * SFC only. This is assigned to:
   * - Slot fragment vnodes with :slotted SFC styles.
   * - Component vnodes (during patch/hydration) so that its root node can
   *   inherit the component's slotScopeIds
   * @internal
   */
  // slotScopeIds: string[] | null
  children: VNodeNormalizedChildren
  // component: ComponentInternalInstance | null
  // dirs: DirectiveBinding[] | null
  transition: TransitionHooks<HostElement> | null

  // DOM
  el: HostNode | null
  placeholder: HostNode | null // async component el placeholder
  anchor: HostNode | null // fragment anchor
  target: HostElement | null // teleport target
  targetStart: HostNode | null // teleport target start anchor
  targetAnchor: HostNode | null // teleport target anchor
  /**
   * number of elements contained in a static vnode
   * @internal
   */
  // staticCount: number

  // suspense
  // suspense: SuspenseBoundary | null
  /**
   * @internal
   */
  // ssContent: VNode | null
  /**
   * @internal
   */
  // ssFallback: VNode | null

  // optimization only
  shapeFlag: number
  patchFlag: number
  /**
   * @internal
   */
  dynamicProps: string[] | null
  /**
   * @internal
   */
  dynamicChildren: (VNode[] & { hasOnce?: boolean }) | null

  // application root node only
  appContext: AppContext

  /**
   * @internal lexical scope owner instance
   */
  ctx: TypeNode | null

  /**
   * @internal attached by v-memo
   */
  // memo?: any[]
  /**
   * @internal index for cleaning v-memo cache
   */
  // cacheIndex?: number
  /**
   * @internal __COMPAT__ only
   */
  isCompatRoot?: true
  /**
   * @internal custom element interception hook
   */
  ce?: (instance: TypeNode) => void
}

// Since v-if and v-for are the two possible ways node structure can dynamically
// change, once we consider v-if branches and each v-for fragment a block, we
// can divide a template into nested blocks, and within each block the node
// structure would be stable. This allows us to skip most children diffing
// and only worry about the dynamic nodes (indicated by patch flags).
export const blockStack: TypeNode['dynamicChildren'][] = []
export let currentBlock: TypeNode['dynamicChildren'] = null

/**
 * Open a block.
 * This must be called before `createBlock`. It cannot be part of `createBlock`
 * because the children of the block are evaluated before `createBlock` itself
 * is called. The generated code typically looks like this:
 *
 * ```js
 * function render() {
 *   return (openBlock(),createBlock('div', null, [...]))
 * }
 * ```
 * disableTracking is true when creating a v-for fragment block, since a v-for
 * fragment always diffs its children.
 *
 * @private
 */
export function openBlock(disableTracking = false): void {
  blockStack.push((currentBlock = disableTracking ? null : []))
}

export function closeBlock(): void {
  blockStack.pop()
  currentBlock = blockStack[blockStack.length - 1] || null
}

// Whether we should be tracking dynamic child nodes inside a block.
// Only tracks when this value is > 0
// We are not using a simple boolean because this value may need to be
// incremented/decremented by nested usage of v-once (see below)
export let isBlockTreeEnabled = 1

/**
 * Block tracking sometimes needs to be disabled, for example during the
 * creation of a tree that needs to be cached by v-once. The compiler generates
 * code like this:
 *
 * ``` js
 * _cache[1] || (
 *   setBlockTracking(-1, true),
 *   _cache[1] = createVNode(...),
 *   setBlockTracking(1),
 *   _cache[1]
 * )
 * ```
 *
 * @private
 */
export function setBlockTracking(value: number, inVOnce = false): void {
  isBlockTreeEnabled += value
  if (value < 0 && currentBlock && inVOnce) {
    // mark current block so it doesn't take fast path and skip possible
    // nested components during unmount
    // currentBlock.hasOnce = true
  }
}

function setupBlock(vnode: TypeNode) {
  // save current block children on the block vnode
  vnode.dynamicChildren =
    isBlockTreeEnabled > 0 ? currentBlock || (EMPTY_ARR as any) : null
  // close block
  closeBlock()
  // a block is always going to be patched, so track it as a child of its
  // parent block
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode)
  }
  return vnode
}

/**
 * @private
 */
export function createElementBlock(
  type: string, // | typeof Fragment,
  props?: Record<string, any> | null,
  children?: any,
  patchFlag?: number,
  dynamicProps?: string[],
  shapeFlag?: number,
): TypeNode {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      // shapeFlag,
      true /* isBlock */,
    ),
  )
}

/**
 * Create a block root vnode. Takes the same exact arguments as `createVNode`.
 * A block root keeps track of dynamic nodes within the block in the
 * `dynamicChildren` array.
 *
 * @private
 */
// export function createBlock(
//   type:TypeNode, //  VNodeTypes | ClassComponent,
//   props?: Record<string, any> | null,
//   children?: any,
//   patchFlag?: number,
//   dynamicProps?: string[],
// ): VNode {
//   return setupBlock(
//     createVNode(
//       type,
//       props,
//       children,
//       patchFlag,
//       dynamicProps,
//       true /* isBlock: prevent a block from tracking itself */,
//     ),
//   )
// }

export function isVNode(value: any): value is TypeNode {
  // return value ? value.__v_isVNode === true : false
  return value instanceof TypeNode;
}

export function isSameVNodeType(n1: TypeNode, n2: TypeNode): boolean {
  // if (__DEV__ && n2.shapeFlag & ShapeFlags.COMPONENT && n1.component) {
  //   const dirtyInstances = hmrDirtyComponents.get(n2.type as TypeNode)
  //   if (dirtyInstances && dirtyInstances.has(n1.component)) {
  //     // #7042, ensure the vnode being unmounted during HMR
  //     // bitwise operations to remove keep alive flags
  //     n1.shapeFlag &= ~ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE
  //     n2.shapeFlag &= ~ShapeFlags.COMPONENT_KEPT_ALIVE
  //     // HMR only: if the component has been hot-updated, force a reload.
  //     return false
  //   }
  // }
  // return n1.type === n2.type && n1.key === n2.key
  return n1.className === n2.className
}

let vnodeArgsTransformer:
  | ((
      args: Parameters<typeof _createVNode>,
      instance: TypeNode | null,
    ) => Parameters<typeof _createVNode>)
  | undefined

/**
 * Internal API for registering an arguments transform for createVNode
 * used for creating stubs in the test-utils
 * It is *internal* but needs to be exposed for test-utils to pick up proper
 * typings
 */
export function transformVNodeArgs(
  transformer?: typeof vnodeArgsTransformer,
): void {
  vnodeArgsTransformer = transformer
}

// const createVNodeWithArgsTransform = (
//   ...args: Parameters<typeof _createVNode>
// ): TypeNode => {
//   return _createVNode(
//     ...(vnodeArgsTransformer
//       ? vnodeArgsTransformer(args, currentRenderingInstance)
//       : args),
//   )
// }

const normalizeKey = ({ key }: VNodeProps): TypeNode['key'] =>
  key != null ? key : null

const normalizeRef = ({
  ref,
  ref_key,
  ref_for,
}: VNodeProps): VNodeNormalizedRefAtom | null => {
  if (typeof ref === 'number') {
    ref = '' + ref;
  }
  return (
    ref != null
      ? isString(ref) || isRef(ref) || isFunction(ref)
        ? { i: currentRenderingInstance, r: ref, k: ref_key, f: !!ref_for }
        : ref
      : null
  ) as any;
};

function createBaseVNode(
  type: VNodeTypes | TypeNode | typeof NULL_DYNAMIC_COMPONENT,
  props: (Data & VNodeProps) | null = null,
  children: unknown = null,
  patchFlag = 0,
  dynamicProps: string[] | null = null,
  // shapeFlag: number = type === Fragment ? 0 : ShapeFlags.ELEMENT,
  isBlockNode = false,
  needFullChildrenNormalization = false
): TypeNode {
  const vnode = {
    // __v_isVNode: true,
    // __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    // scopeId: currentScopeId,
    // slotScopeIds: null,
    children,
    // component: null,
    // suspense: null,
    // ssContent: null,
    // ssFallback: null,
    // dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    // staticCount: 0,
    // shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance,
  } as unknown as TypeNode;

  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    // normalize suspense children
    // if (__FEATURE_SUSPENSE__ && shapeFlag & ShapeFlags.SUSPENSE) {
    //   ;(type as typeof SuspenseImpl).normalize(vnode)
    // }
  } else if (children) {
    // compiled element vnode - if children is passed, only possible types are
    // string or Array.
    vnode.shapeFlag! |= isString(children)
      ? ShapeFlags.TEXT_CHILDREN
      : ShapeFlags.ARRAY_CHILDREN;
  }

  // validate key
  if (
    // __DEV__ &&
    vnode.key !== vnode.key
  ) {
    // warn(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  }

  // track vnode for block tree
  if (
    isBlockTreeEnabled > 0 &&
    // avoid a block node from tracking itself
    !isBlockNode &&
    // has current parent block
    currentBlock &&
    // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    // (vnode.patchFlag > 0 || shapeFlag & ShapeFlags.COMPONENT) &&
    // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    vnode.patchFlag !== PatchFlags.NEED_HYDRATION
  ) {
    currentBlock.push(vnode);
  }

  // if (__COMPAT__) {
  //   convertLegacyVModelProps(vnode)
  //   defineLegacyVNodeProperties(vnode)
  // }

  return vnode;
}

export { createBaseVNode as createElementVNode }

export const createVNode = (
  /* __DEV__ ? createVNodeWithArgsTransform : */_createVNode
) as typeof _createVNode

function _createVNode(
  type: VNodeTypes | TypeNode | typeof NULL_DYNAMIC_COMPONENT,
  props: (Data & VNodeProps) | null = null,
  children: unknown = null,
  patchFlag = 0,
  dynamicProps: string[] | null = null,
  isBlockNode = false,
): TypeNode {
  // if (!type || type === NULL_DYNAMIC_COMPONENT) {
  //   if (__DEV__ && !type) {
  //     warn(`Invalid vnode type when creating vnode: ${type}.`)
  //   }
  //   type = Comment
  // }

  // if (isVNode(type)) {
  //   // createVNode receiving an existing vnode. This happens in cases like
  //   // <component :is="vnode"/>
  //   // #2078 make sure to merge refs during the clone instead of overwriting it
  //   const cloned = cloneVNode(type, props, true /* mergeRef: true */)
  //   if (children) {
  //     normalizeChildren(cloned, children)
  //   }
  //   if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
  //     if (cloned.shapeFlag & ShapeFlags.COMPONENT) {
  //       currentBlock[currentBlock.indexOf(type)] = cloned
  //     } else {
  //       currentBlock.push(cloned)
  //     }
  //   }
  //   cloned.patchFlag = PatchFlags.BAIL
  //   return cloned
  // }

  // class component normalization.
  // if (isClassComponent(type)) {
  //   type = type.__vccOpts
  // }

  // 2.x async/functional component compat
  // if (__COMPAT__) {
  //   type = convertLegacyComponent(type, currentRenderingInstance)
  // }

  // class & style normalization.
  if (props) {
    // for reactive or proxy objects, we need to clone it to enable mutation.
    props = guardReactiveProps(props)!
    const { class: klass, style } = props
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass)
    }
    if (isObject(style)) {
      // reactive state objects need to be cloned since they are likely to be
      // mutated
      // if (isProxy(style) && !isArray(style)) {
      //   style = extend({}, style)
      // }
      props.style = normalizeStyle(style)
    }
  }

  // encode the vnode type information into a bitmap
  // const shapeFlag = isString(type)
  //   ? ShapeFlags.ELEMENT
  //   // : __FEATURE_SUSPENSE__ && isSuspense(type)
  //   //   ? ShapeFlags.SUSPENSE
  //   //   : isTeleport(type)
  //   //     ? ShapeFlags.TELEPORT
  //       : isObject(type)
  //         ? ShapeFlags.STATEFUL_COMPONENT
  //         : isFunction(type)
  //           ? ShapeFlags.FUNCTIONAL_COMPONENT
  //           : 0

  // if (__DEV__ && shapeFlag & ShapeFlags.STATEFUL_COMPONENT && isProxy(type)) {
  //   type = toRaw(type)
  //   warn(
  //     `Vue received a Component that was made a reactive object. This can ` +
  //       `lead to unnecessary performance overhead and should be avoided by ` +
  //       `marking the component with \`markRaw\` or using \`shallowRef\` ` +
  //       `instead of \`ref\`.`,
  //     `\nComponent that was made reactive: `,
  //     type,
  //   )
  // }

  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    // shapeFlag,
    isBlockNode,
    true,
  )
}

export function guardReactiveProps(
  props: (Data & VNodeProps) | null,
): (Data & VNodeProps) | null {
  if (!props) return null
  // return // isProxy(props) ||
  return  isInternalObject(props) ? extend({}, props) : props
}

export function cloneVNode(
  vnode: TypeNode,
  extraProps?: (Data & VNodeProps) | null,
  mergeRef = false,
  cloneTransition = false,
): TypeNode {
  // This is intentionally NOT using spread or extend to avoid the runtime
  // key enumeration cost.
  // const { props, ref, patchFlag, children, transition } = vnode
  // const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props
  // const cloned: VNode<T, U> = {
  //   // __v_isVNode: true,
  //   // __v_skip: true,
  //   type: vnode.type,
  //   props: mergedProps,
  //   key: mergedProps && normalizeKey(mergedProps),
  //   ref:
  //     extraProps && extraProps.ref
  //       ? // #2078 in the case of <component :is="vnode" ref="extra"/>
  //         // if the vnode itself already has a ref, cloneVNode will need to merge
  //         // the refs so the single vnode can be set on multiple refs
  //         mergeRef && ref
  //         ? isArray(ref)
  //           ? ref.concat(normalizeRef(extraProps)!)
  //           : [ref, normalizeRef(extraProps)!]
  //         : normalizeRef(extraProps)
  //       : ref,
  //   // scopeId: vnode.scopeId,
  //   // slotScopeIds: vnode.slotScopeIds,
  //   children:
  //     // __DEV__ &&
  //     patchFlag === PatchFlags.CACHED && isArray(children)
  //       ? (children as VNode[]).map(deepCloneVNode)
  //       : children,
  //   target: vnode.target,
  //   targetStart: vnode.targetStart,
  //   targetAnchor: vnode.targetAnchor,
  //   staticCount: vnode.staticCount,
  //   shapeFlag: vnode.shapeFlag,
  //   // if the vnode is cloned with extra props, we can no longer assume its
  //   // existing patch flag to be reliable and need to add the FULL_PROPS flag.
  //   // note: preserve flag for fragments since they use the flag for children
  //   // fast paths only.
  //   // patchFlag:
  //   //   extraProps && vnode.type !== Fragment
  //   //     ? patchFlag === PatchFlags.CACHED // hoisted node
  //   //       ? PatchFlags.FULL_PROPS
  //   //       : patchFlag | PatchFlags.FULL_PROPS
  //   //     : patchFlag,
  //   // dynamicProps: vnode.dynamicProps,
  //   // dynamicChildren: vnode.dynamicChildren,
  //   appContext: vnode.appContext,
  //   // dirs: vnode.dirs,
  //   transition,
  //
  //   // These should technically only be non-null on mounted VNodes. However,
  //   // they *should* be copied for kept-alive vnodes. So we just always copy
  //   // them since them being non-null during a mount doesn't affect the logic as
  //   // they will simply be overwritten.
  //   // component: vnode.component,
  //   // suspense: vnode.suspense,
  //   // ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
  //   // ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
  //   placeholder: vnode.placeholder,
  //
  //   el: vnode.el,
  //   anchor: vnode.anchor,
  //   ctx: vnode.ctx,
  //   ce: vnode.ce,
  // }

  const cloned = new (vnode as any).constructor(vnode.params);
  // if the vnode will be replaced by the cloned one, it is necessary
  // to clone the transition to ensure that the vnode referenced within
  // the transition hooks is fresh.
  // if (transition && cloneTransition) {
  //   setTransitionHooks(
  //     cloned,
  //     transition.clone(cloned as VNode) as TransitionHooks,
  //   )
  // }

  // if (__COMPAT__) {
  //   defineLegacyVNodeProperties(cloned as VNode)
  // }

  return cloned
}

/**
 * Dev only, for HMR of hoisted vnodes reused in v-for
 * https://github.com/vitejs/vite/issues/2022
 */
// function deepCloneVNode(vnode: VNode): VNode {
//   const cloned = cloneVNode(vnode)
//   if (isArray(vnode.children)) {
//     cloned.children = (vnode.children as VNode[]).map(deepCloneVNode)
//   }
//   return cloned
// }

/**
 * @private
 */
export function createTextVNode(text = ' ', flag = 0): TypeNode {
  return createVNode('Text', null, text, flag)
}

/**
 * @private
 */
// export function createStaticVNode(
//   content: string,
//   numberOfNodes: number,
// ): VNode {
//   // A static vnode can contain multiple stringified elements, and the number
//   // of elements is necessary for hydration.
//   const vnode = createVNode(Static, null, content)
//   // vnode.staticCount = numberOfNodes
//   return vnode
// }

/**
 * @private
 */
// export function createCommentVNode(
//   text = '',
//   // when used as the v-else branch, the comment node must be created as a
//   // block to ensure correct updates.
//   asBlock = false,
// ): VNode {
//   return asBlock
//     ? (openBlock(), createBlock(Comment, null, text))
//     : createVNode(Comment, null, text)
// }

export function normalizeVNode(child: VNodeChild): TypeNode | undefined {
  if (child == null || typeof child === 'boolean') {
    // empty placeholder
    return createVNode('Comment')
  } else if (isArray(child)) {
    // fragment
    return createVNode(
      'fragment', // Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice(),
    )
  } else if (isVNode(child)) {
    // already vnode, this should be the most common since compiled templates
    // always produce all-vnode children arrays
    return cloneIfMounted(child)
  } else {
    // strings and numbers
    return createVNode('Text', null, String(child))
  }
}

// optimized normalization for template-compiled render fns
export function cloneIfMounted(child: TypeNode): TypeNode {
  // return (child.el === null && child.patchFlag !== PatchFlags.CACHED) // || child.memo
  //   ? child
  //   : cloneVNode(child)
  return cloneVNode(child)
}

export function normalizeChildren(vnode: TypeNode, children: unknown): void {
  // let type = 0
  const { shapeFlag } = vnode
  if (children == null) {
    children = null
  } else if (isArray(children)) {
    // type = ShapeFlags.ARRAY_CHILDREN
  } else if (typeof children === 'object') {
    if (shapeFlag! & (ShapeFlags.ELEMENT | ShapeFlags.TELEPORT)) {
      // Normalize slot to plain children for plain element and Teleport
      const slot = (children as any).default
      if (slot) {
        // _c marker is added by withCtx() indicating this is a compiled slot
        // slot._c && (slot._d = false)
        normalizeChildren(vnode, slot())
        // slot._c && (slot._d = true)
      }
      return
    } else {
      // type = ShapeFlags.SLOTS_CHILDREN
      // const slotFlag = (children as RawSlots)._
      // if (!slotFlag && !isInternalObject(children)) {
      //   // if slots are not normalized, attach context instance
      //   // (compiled / normalized slots already have context)
      //   ;(children as RawSlots)._ctx = currentRenderingInstance
      // } else if (slotFlag === SlotFlags.FORWARDED && currentRenderingInstance) {
      //   // a child component receives forwarded slots from the parent.
      //   // its slot type is determined by its parent's slot type.
      //   if (
      //     (currentRenderingInstance.slots as RawSlots)._ === SlotFlags.STABLE
      //   ) {
      //     ;(children as RawSlots)._ = SlotFlags.STABLE
      //   } else {
      //     ;(children as RawSlots)._ = SlotFlags.DYNAMIC
      //     vnode.patchFlag |= PatchFlags.DYNAMIC_SLOTS
      //   }
      // }
    }
  // } else if (isFunction(children)) {
  //   children = { default: children, _ctx: currentRenderingInstance }
  //   type = ShapeFlags.SLOTS_CHILDREN
  // } else {
  //   children = String(children)
  //   // force teleport children to array so it can be moved around
  //   if (shapeFlag & ShapeFlags.TELEPORT) {
  //     type = ShapeFlags.ARRAY_CHILDREN
  //     children = [createTextVNode(children as string)]
  //   } else {
  //     type = ShapeFlags.TEXT_CHILDREN
  //   }
  }
  // vnode.children = children as VNodeNormalizedChildren
  // vnode.shapeFlag |= type
}

export function mergeProps(...args: (Data & VNodeProps)[]): Data {
  const ret: Data = {}
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i]
    for (const key in toMerge) {
      if (key === 'class') {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class])
        }
      } else if (key === 'style') {
        ret.style = normalizeStyle([ret.style, toMerge.style])
      } else if (isOn(key)) {
        const existing = ret[key]
        const incoming = toMerge[key]
        if (
          incoming &&
          existing !== incoming &&
          !(isArray(existing) && existing.includes(incoming))
        ) {
          ret[key] = existing
            ? [].concat(existing as any, incoming as any)
            : incoming
        }
      } else if (key !== '') {
        ret[key] = toMerge[key]
      }
    }
  }
  return ret
}

export function invokeVNodeHook(
  hook: VNodeHook,
  instance?: TypeNode,
  vnode?: TypeNode,
  prevVNode: TypeNode | null = null,
): void {
  callWithAsyncErrorHandling(hook, instance, ErrorCodes.VNODE_HOOK, [
    vnode,
    prevVNode,
  ])
}
