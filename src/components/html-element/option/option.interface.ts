import { TypeSelect } from '../../../core/type-html/select/select.abstract';
import {
  ITypeOption,
  TypeOptionProps,
} from '../../../core/type-html/option/option.interface';

export interface IOption extends ITypeOption {
  className: 'Option';
  props: OptionProps;
  // childNodes: ITypNode[],
}

export interface OptionProps extends TypeOptionProps {
  parent: TypeSelect;
}
