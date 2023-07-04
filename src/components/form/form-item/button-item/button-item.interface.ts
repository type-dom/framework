import { ILabel } from '../../../../../type-dom/element/html-element/label/label.interface';
import { ISpan } from '../../../../../type-dom/element/html-element/span/span.interface';
import { IInput } from '../../../../../type-dom/element/html-element/input/input.interface';
import { IFormItem } from '../form-item.interface';

export interface IButtonItem extends IFormItem {
  className: 'ButtonItem',
  childNodes: [ILabel, IInput, ISpan]
}
