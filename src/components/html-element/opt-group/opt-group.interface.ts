import {
  ITypeOptGroup,
  TypeOptGroupProps,
} from '../../../core/type-html/opt-group/opt-group.interface';

export interface IOptGroup extends ITypeOptGroup {
  className: 'OptGroup';
  props: TypeOptGroupProps;
  // childNodes: ITypNode[],
}
