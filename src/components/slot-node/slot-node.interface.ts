import { TypeNode } from '../../core/type-node/type-node.abstract';
import { ITypeConfig } from '../../core/type-node/type-node.interface';

export interface ISlotNodeConfig extends ITypeConfig {
  name: string; // default .....
  slot?: string | TypeNode | (string | TypeNode)[]
}
