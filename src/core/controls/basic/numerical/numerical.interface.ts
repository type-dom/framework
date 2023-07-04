import { IInputItem } from '../../../../components/form/form-item/input-item/input-item.interface';
import { IWebControl } from '../../web-control.interface';

export interface INumericalControl extends IWebControl {
  className: 'NumericalControl',
  childNodes: [IInputItem],
}
