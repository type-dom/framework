import { TypeSelect } from 'libs/framework/src/core/type-html/select/select.abstract';
import { ITypeOption, ITypeOptionConfig } from '../../../core/type-html/option/option.interface';


export interface IOption extends ITypeOption {
  className: 'Option';
  props: IOptionConfig;
  // childNodes: ITypNode[],
}

export interface IOptionConfig extends ITypeOptionConfig {
  parent: TypeSelect;
}
