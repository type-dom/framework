import { TypeProps, ITypeNode } from '../../core/type-node/type-node.interface';

export interface ITeleport extends ITypeNode {
  className: 'Teleport';
}

export interface TeleportProps extends TypeProps {
  // to?: MaybeRef<string | HTMLElement>;
  disabled?: boolean;
}
