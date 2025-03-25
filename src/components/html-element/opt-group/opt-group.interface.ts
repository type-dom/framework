import { TypeSelect } from '../../../core/type-html/select/select.abstract';
import {
  ITypeOptGroup,
  TypeOptGroupProps,
} from '../../../core/type-html/opt-group/opt-group.interface';

export interface IOptGroup extends ITypeOptGroup {
  className: 'OptGroup';
  props: OptGroupProps;
  // childNodes: ITypNode[],
}

export interface OptGroupProps extends TypeOptGroupProps {
  parent: TypeSelect;
}
