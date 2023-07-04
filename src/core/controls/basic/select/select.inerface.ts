import { SelectItem } from '../../../../components/form/form-item/select-item/select-item.class';
import { IWebControl } from '../../web-control.interface';

export interface ISelectControl extends IWebControl {
  className: 'SelectControl',
  childNodes: [SelectItem],
}
