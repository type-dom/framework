import { TypeNode } from '../abstracts/type-node/type-node.abstract';
// import { TypeElement } from '../type-element/type-element.abstract';
import { unmount } from './unmount';

type UnmountChildrenFn = (
  children: TypeNode[],
  parentComponent?: TypeNode,
  // parentSuspense: SuspenseBoundary | null,
  doRemove?: boolean,
  optimized?: boolean,
  start?: number,
) => void

export const unmountChildren: UnmountChildrenFn = (
  children,
  parentComponent,
  // parentSuspense,
  doRemove = false,
  optimized = false,
  start = 0,
) => {
  for (let i = start; i < children.length; i++) {
    unmount(children[i], parentComponent) //, doRemove) // , optimized)
  }
}
