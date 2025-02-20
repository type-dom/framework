import { TypeSelect } from '../../../core/type-html/select/select.abstract';
import { ITypeOptGroup, ITypeOptGroupConfig } from '../../../core/type-html/opt-group/opt-group.interface';

export interface IOptGroup extends ITypeOptGroup {
  className: 'OptGroup';
  props: IOptGroupConfig;
  // childNodes: ITypNode[],
}

export interface IOptGroupConfig extends ITypeOptGroupConfig {
  parent: TypeSelect;
}
