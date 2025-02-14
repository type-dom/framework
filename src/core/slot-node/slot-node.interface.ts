import { ISlotConfig, ITypeConfig } from '../type-node/type-node.interface';

export interface ISlotNodeConfig extends ITypeConfig {
  name: string; // default .....
  slot?: ISlotConfig;
}
