// import { logger } from '@type-dom/decorators';
// import { logger } from '@type-dom/utils';
import { MaybeRef, unref, watch } from '../../../reactivity';
import { TypeElement } from '../../../core/abstracts/type-element/type-element.abstract';
import { TypeFragment } from '../../../core/abstracts/type-fragment/type-fragment.abstract';
import { transformSlot } from '../../../core/transforms/transformSlot';
import { RawDom, RendererElement } from '../../../core/renderer/renderer';
import { renderTeleport } from '../../../core/renderer/renderTeleport';
import { createAnchor } from '../../../core/renderer/anchor';
// import { onMounted } from '../../../core/apiLifecycle';
// import { remove as hostRemove } from '../../../core/renderer/remove'
// import { unmount } from '../../../core/renderer/unmount';
// import { nextFrame } from '../transition/transition.util';
import { ITeleport, TeleportProps } from './teleport.interface';

/**
 * teleport
 * 将子节点渲染到指定位置。
 * teleport 节点的子节点会移动到 teleport 的 target 属性指定的元素中。
 */
// @logConcrete
// @logger.concrete()
export class Teleport extends TypeFragment<TeleportProps> implements ITeleport {
  className: 'Teleport';
  // __isTeleport = true;
  // override to?: MaybeRef<string | RawDom | TypeElement>;
  override anchorStart: Comment | Text;
  override anchor: Comment | Text;
  override targetStart: Comment | Text;
  override targetAnchor: Comment | Text;
  disabled?: MaybeRef<boolean | undefined>;

  constructor(params: TeleportProps = {}) {
    // console.warn('Teleport constructor . ');
    super(params);
    this.className = 'Teleport';
    this.to = params.to;
    this.disabled = params.disabled;
    // console.error('then transform . ');
    this.anchorStart = document.createComment('teleport start'); // 单独创建，不用createAnchor.
    this.anchor = document.createComment('teleport end');
    this.targetStart = createAnchor('target start-' + this.uid);
    this.targetAnchor = createAnchor('target anchor-' + this.uid);
    transformSlot(this, params.slot ?? params.slots?.default);
  }

  override setup() {
    // console.warn('Teleport setup . ');
    watch(
      (): [string | TypeElement | RawDom | undefined, boolean | undefined] => [
        unref(this.to),
        unref(this.disabled),
      ],
      () => {
        console.warn('Teleport watch this.to or this.disabled . ');
        renderTeleport(this, this.anchor.parentNode as RendererElement);
      }
    );
  }
  // process(
  //   n1: TypeNode | null,
  //   n2: TypeNode,
  //   container: RendererElement,
  //   anchor: RendererNode | null,
  //   parentComponent: ComponentInternalInstance | null,
  //   parentSuspense: SuspenseBoundary | null,
  //   namespace: ElementNamespace,
  //   slotScopeIds: string[] | null,
  //   optimized: boolean,
  //   internals: RendererInternals,
  // ) {
  //   const {
  //     mc: mountChildren,
  //     pc: patchChildren,
  //     pbc: patchBlockChildren,
  //     o: { insert, querySelector, createText, createComment },
  //   } = internals
  //
  //   const disabled = isTeleportDisabled(n2.props)
  //   let { shapeFlag, children, dynamicChildren } = n2
  //
  //   // #3302
  //   // HMR updated, force full diff
  //   if (__DEV__ && isHmrUpdating) {
  //     optimized = false
  //     dynamicChildren = null
  //   }
  //
  //   if (n1 == null) {
  //     // insert anchors in the main view
  //     const placeholder = (n2.el = __DEV__
  //       ? createComment('teleport start')
  //       : createText(''))
  //     const mainAnchor = (n2.anchor = __DEV__
  //       ? createComment('teleport end')
  //       : createText(''))
  //     insert(placeholder, container, anchor)
  //     insert(mainAnchor, container, anchor)
  //     const target = (n2.target = resolveTarget(n2.props, querySelector))
  //     const targetAnchor = (n2.targetAnchor = createText(''))
  //     if (target) {
  //       insert(targetAnchor, target)
  //       // #2652 we could be teleporting from a non-SVG tree into an SVG tree
  //       if (namespace === 'svg' || isTargetSVG(target)) {
  //         namespace = 'svg'
  //       } else if (namespace === 'mathml' || isTargetMathML(target)) {
  //         namespace = 'mathml'
  //       }
  //     } else if (__DEV__ && !disabled) {
  //       warn('Invalid Teleport target on mount:', target, `(${typeof target})`)
  //     }
  //
  //     const mount = (container: RendererElement, anchor: RendererNode) => {
  //       // Teleport *always* has Array children. This is enforced in both the
  //       // compiler and vnode children normalization.
  //       if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
  //         mountChildren(
  //           children as VNodeArrayChildren,
  //           container,
  //           anchor,
  //           parentComponent,
  //           parentSuspense,
  //           namespace,
  //           slotScopeIds,
  //           optimized,
  //         )
  //       }
  //     }
  //
  //     if (disabled) {
  //       mount(container, mainAnchor)
  //     } else if (target) {
  //       mount(target, targetAnchor)
  //     }
  //   } else {
  //     // update content
  //     n2.el = n1.el
  //     const mainAnchor = (n2.anchor = n1.anchor)!
  //     const target = (n2.target = n1.target)!
  //     const targetAnchor = (n2.targetAnchor = n1.targetAnchor)!
  //     const wasDisabled = isTeleportDisabled(n1.props)
  //     const currentContainer = wasDisabled ? container : target
  //     const currentAnchor = wasDisabled ? mainAnchor : targetAnchor
  //
  //     if (namespace === 'svg' || isTargetSVG(target)) {
  //       namespace = 'svg'
  //     } else if (namespace === 'mathml' || isTargetMathML(target)) {
  //       namespace = 'mathml'
  //     }
  //
  //     if (dynamicChildren) {
  //       // fast path when the teleport happens to be a block root
  //       patchBlockChildren(
  //         n1.dynamicChildren!,
  //         dynamicChildren,
  //         currentContainer,
  //         parentComponent,
  //         parentSuspense,
  //         namespace,
  //         slotScopeIds,
  //       )
  //       // even in block tree mode we need to make sure all root-level nodes
  //       // in the teleport inherit previous DOM references so that they can
  //       // be moved in future patches.
  //       traverseStaticChildren(n1, n2, true)
  //     } else if (!optimized) {
  //       patchChildren(
  //         n1,
  //         n2,
  //         currentContainer,
  //         currentAnchor,
  //         parentComponent,
  //         parentSuspense,
  //         namespace,
  //         slotScopeIds,
  //         false,
  //       )
  //     }
  //
  //     if (disabled) {
  //       if (!wasDisabled) {
  //         // enabled -> disabled
  //         // move into main container
  //         moveTeleport(
  //           n2,
  //           container,
  //           mainAnchor,
  //           internals,
  //           TeleportMoveTypes.TOGGLE,
  //         )
  //       } else {
  //         // #7835
  //         // When `teleport` is disabled, `to` may change, making it always old,
  //         // to ensure the correct `to` when enabled
  //         if (n2.props && n1.props && n2.props.to !== n1.props.to) {
  //           n2.props.to = n1.props.to
  //         }
  //       }
  //     } else {
  //       // target changed
  //       if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
  //         const nextTarget = (n2.target = resolveTarget(
  //           n2.props,
  //           querySelector,
  //         ))
  //         if (nextTarget) {
  //           moveTeleport(
  //             n2,
  //             nextTarget,
  //             null,
  //             internals,
  //             TeleportMoveTypes.TARGET_CHANGE,
  //           )
  //         } else if (__DEV__) {
  //           warn(
  //             'Invalid Teleport target on update:',
  //             target,
  //             `(${typeof target})`,
  //           )
  //         }
  //       } else if (wasDisabled) {
  //         // disabled -> enabled
  //         // move into teleport target
  //         moveTeleport(
  //           n2,
  //           target,
  //           targetAnchor,
  //           internals,
  //           TeleportMoveTypes.TOGGLE,
  //         )
  //       }
  //     }
  //   }
  //
  //   updateCssVars(n2)
  // }
}
