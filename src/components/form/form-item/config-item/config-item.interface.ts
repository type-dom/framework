import { ILabel } from '../../../../../type-dom/element/html-element/label/label.interface';
import { ISpan } from '../../../../../type-dom/element/html-element/span/span.interface';
import { ISelect } from '../../../../../type-dom/element/html-element/select/select.interface';
import { IRadioGroup } from '../../../../../type-dom/components/radio-group/radio-group.interface';
import { ICheckboxGroup } from '../../../../../type-dom/components/checkbox-group/checkbox-group.interface';
import { IFormItem } from '../form-item.interface';

export interface IConfigItem extends IFormItem {
  className: string,
  childNodes: [ILabel, ISelect | IRadioGroup | ICheckboxGroup, ISpan]
}
