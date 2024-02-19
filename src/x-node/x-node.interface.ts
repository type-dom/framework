import type { ITypeNode } from '../type-node/type-node.interface';
export interface IXNode extends ITypeNode {
  className?: 'XNode',
  childNodes?: IXNode[]
}
