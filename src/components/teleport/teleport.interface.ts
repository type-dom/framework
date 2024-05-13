import { TypeElement } from '../../core/type-element/type-element.abstract';
import { ITypeElement } from '../../core/type-element/type-element.interface';
import { ITypeConfig } from '../../core/type-node/type-node.interface';


export interface ITeleport extends ITypeElement {
  className: 'Teleport';
}

export interface ITeleportConfig extends ITypeConfig {
  to?: string | TypeElement | null;
  disabled?: boolean;
}
