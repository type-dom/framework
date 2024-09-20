import type { ITypeSelect } from '../../../core/type-html/select/select.interface';
import type { IOption } from '../option/option.interface';

export interface ISelect extends ITypeSelect {
  className: 'Select';
  childNodes: IOption[];
}

export interface IOpt {
  label: string;
  value: string;
}
