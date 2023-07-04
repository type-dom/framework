import { IFormItem } from '../form-item.interface';
import { ILabel } from '../../../../../type-dom/element/html-element/label/label.interface';
import { IInput } from '../../../../../type-dom/element/html-element/input/input.interface';
import { ISpan } from '../../../../../type-dom/element/html-element/span/span.interface';

export interface IInputItem extends IFormItem {
  className: 'InputItem',
  childNodes: [ILabel, IInput, ISpan],
}
