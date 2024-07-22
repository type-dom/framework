import { TypeNode } from '../../core/type-node/type-node.abstract';

export enum MoveType {
  ENTER,
  LEAVE,
  REORDER,
}

// export function moveTeleport(
//   vnode: TypeNode,
//   container: RendererElement,
//   parentAnchor: RendererNode | null,
//   { o: { insert }, m: move }: RendererInternals,
//   moveType: TeleportMoveTypes = TeleportMoveTypes.REORDER,
// ) {
//   // move target anchor if this is a target change.
//   if (moveType === TeleportMoveTypes.TARGET_CHANGE) {
//     insert(vnode.targetAnchor!, container, parentAnchor)
//   }
//   const { el, anchor, shapeFlag, children, props } = vnode
//   const isReorder = moveType === TeleportMoveTypes.REORDER
//   // move main view anchor if this is a re-order.
//   if (isReorder) {
//     insert(el!, container, parentAnchor)
//   }
//   // if this is a re-order and teleport is enabled (content is in target)
//   // do not move children. So the opposite is: only move children if this
//   // is not a reorder, or the teleport is disabled
//   if (!isReorder || isTeleportDisabled(props)) {
//     // Teleport has either Array children or no children.
//     if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
//       for (let i = 0; i < (children as TypeNode[]).length; i++) {
//         move(
//           (children as TypeNode[])[i],
//           container,
//           parentAnchor,
//           MoveType.REORDER,
//         )
//       }
//     }
//   }
//   // move main view anchor if this is a re-order.
//   if (isReorder) {
//     insert(anchor!, container, parentAnchor)
//   }
// }
