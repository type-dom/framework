// import { TypeNode } from '../abstracts/type-node/type-node.abstract';
// import { nodeOps } from '../../dom/nodeOps';
// import { TransitionElement } from '../abstracts';
// import { RendererNode } from './renderer';
// import { removeBetween } from './removeBetween';
// const hostRemove = nodeOps.remove;
//
// type RemoveFn = (node: TypeNode) => void
// export const remove: RemoveFn = node => {
//   // console.error('removeDom . ');
//   const { dom, anchor, transition } = node
//   // const type = props.nodeName;
//   if (dom instanceof DocumentFragment) {
//     if (
//       // __DEV__ &&
//       // vnode.patchFlag > 0 &&
//       // vnode.patchFlag & PatchFlags.DEV_ROOT_FRAGMENT &&
//       transition &&
//       !transition.persisted
//     ) {
//       node.children.forEach(child => {
//         if (child.dom instanceof Comment) { // todo 应该是没有的。
//           hostRemove(child.dom!);
//           console.error('child is Comment . ');
//         } else {
//           remove(child)
//         }
//       })
//     } else {
//       // todo anchorStart 没有删除，  中间所有的 comment 也会被删除。
//       removeBetween(dom!, anchor as RendererNode);
//     }
//     return
//   }
//   //
//   // if (type === Static) {
//   //   removeStaticNode(vnode)
//   //   return
//   // }
//
//   const performRemove = () => {
//     hostRemove(dom!)
//     if (transition && !transition.persisted && transition.afterLeave) {
//       transition.afterLeave()
//     }
//   }
//
//   if (
//     // vnode.shapeFlag & ShapeFlags.ELEMENT &&
//     transition &&
//     !transition.persisted
//   ) {
//     const { leave, delayLeave } = transition
//     const performLeave = () => leave(dom! as TransitionElement, performRemove)
//     if (delayLeave) {
//       delayLeave(node.dom! as TransitionElement, performRemove, performLeave)
//     } else {
//       performLeave()
//     }
//   } else {
//     performRemove()
//   }
// }
