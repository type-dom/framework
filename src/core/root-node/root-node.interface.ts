import { ITypeRoot } from '../type-root/type-root.interface';
import { ITypeConfig } from '../type-node/type-node.interface';

export interface IRootNode extends ITypeRoot {
  to?: HTMLElement;
}

export interface IRootNodeConfig extends ITypeConfig {
  to?: HTMLElement;
}
