import { ITypeSelect } from '../../../type-element/type-html/select/select.interface';
import { IOption } from '../option/option.interface';
export interface ISelect extends ITypeSelect {
  className: 'Select',
  childNodes: IOption[];
}
export interface IOpt {
  label: string,
  value: string,
}
