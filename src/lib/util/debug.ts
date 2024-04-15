import { noop } from '../shared/util'
import type { ITypeNode as Component } from '../type-node/type-node.interface';

export const warn: (msg: string, vm?: Component | null) => void = noop
