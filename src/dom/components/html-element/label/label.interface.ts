import type { ITextNode } from '../../text-node/text-node.interface';
import { ITypeLabel } from '../../../../core';
import type { IInput } from '../input/input.interface';

export interface ILabel extends ITypeLabel {
  className: 'Label';
  childNodes: (IInput | ITextNode)[];
}
