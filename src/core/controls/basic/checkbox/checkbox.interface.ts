import { ICheckboxItem } from '../../../../components/form/form-item/checkbox-item/checkbox-item.interface';
import { IWebControl } from '../../web-control.interface';

export interface ICheckboxControl extends IWebControl {
  className: 'CheckboxControl',
  childNodes: [ICheckboxItem],
}
