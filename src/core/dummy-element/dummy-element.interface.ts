import { ITypeNode } from '../type-node/type-node.interface';

export interface IDummyElement extends ITypeNode {
  nodeName: undefined;
  nodeValue: undefined;
  dom: undefined;
}
