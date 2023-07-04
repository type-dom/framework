import { IInput } from '../../../element/html-element/input/input.interface';
import { ITextNode } from '../../../text-node/text-node.interface';
import { ITypeSpan } from '../../../type-element/type-html/span/span.interface';

export interface IRadioOption extends ITypeSpan {
  className: 'RadioOption',
  childNodes: [IInput, ITextNode],
}
