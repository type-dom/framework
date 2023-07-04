import { ILabel } from '../../../../../type-dom/element/html-element/label/label.interface';
import { ITextarea } from '../../../../../type-dom/element/html-element/textarea/textarea.interface';
import { ISpan } from '../../../../../type-dom/element/html-element/span/span.interface';
import { IFormItem } from '../form-item.interface';

export interface ITextareaItem extends IFormItem {
  className: 'TextareaItem',
  childNodes: [ILabel, ITextarea, ISpan];
}
