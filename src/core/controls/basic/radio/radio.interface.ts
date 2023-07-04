import { IRadioItem } from '../../../../components/form/form-item/radio-item/radio-item.interface';
import { IWebControl } from '../../web-control.interface';

export interface IRadioControl extends IWebControl {
  className: 'RadioControl',
  childNodes: [IRadioItem],
}
