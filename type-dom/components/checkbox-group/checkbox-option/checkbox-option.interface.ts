import { IInput } from '../../../element/html-element/input/input.interface';
import { ITypeSpan } from '../../../type-element/type-html/span/span.interface';
import { ITextNode } from '../../../text-node/text-node.interface';

export interface ICheckboxOption extends ITypeSpan {
  className: 'CheckboxOption',
  childNodes: [IInput, ITextNode],
}
