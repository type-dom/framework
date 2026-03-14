import { TypeNode } from '../abstracts/type-node/type-node.abstract';

export function isSameNodeType(n1: TypeNode, n2: TypeNode): boolean {
  // if (__DEV__ && n2.shapeFlag & ShapeFlags.COMPONENT && n1.component) {
  //   const dirtyInstances = hmrDirtyComponents.get(n2.type as ConcreteComponent)
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
  return n1.className === n2.className || n1.uid === n2.uid;
}
