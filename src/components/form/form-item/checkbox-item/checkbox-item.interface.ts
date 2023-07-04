import { ILabel } from '../../../../../type-dom/element/html-element/label/label.interface';
import { ISpan } from '../../../../../type-dom/element/html-element/span/span.interface';
import { ICheckboxGroup } from '../../../../../type-dom/components/checkbox-group/checkbox-group.interface';
import { IFormItem } from '../form-item.interface';

export interface ICheckboxItem extends IFormItem {
  className: 'CheckboxItem',
  childNodes: [ILabel, ICheckboxGroup, ISpan]
}
