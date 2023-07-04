import { IInputItem } from '../../../../components/form/form-item/input-item/input-item.interface';
import { IWebControl } from '../../web-control.interface';

export interface IDateTimeControl extends IWebControl {
  className: 'DateTimeControl',
  childNodes: [IInputItem],
}
