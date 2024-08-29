import { TypeElement } from '../../core/type-element/type-element.abstract';
import { ITypeConfig, ITypeNode } from '../../core/type-node/type-node.interface';


export interface ITeleport extends ITypeNode {
  className: 'Teleport';
}

export interface ITeleportConfig extends ITypeConfig {
  to?: HTMLElement;
  disabled?: boolean;
}
