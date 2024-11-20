import { TypeNode } from '../type-node/type-node.abstract';
import { ITypeConfig } from '../type-node/type-node.interface';

export interface ISlotNodeConfig extends ITypeConfig {
  name: string; // default .....
  slot?: string | TypeNode | (string | TypeNode)[];
}
