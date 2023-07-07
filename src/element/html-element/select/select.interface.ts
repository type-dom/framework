import { ITypeHtml } from '../../../type-element/type-html/type-html.interface';
import { IOption } from '../option/option.interface';

export interface ISelect extends ITypeHtml {
  className: 'Select',
  childNodes: IOption[];
}
export interface IOpt {
  label: string,
  value: string,
}
