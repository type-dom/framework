import {
  ITypeOptGroup,
  TypeOptGroupProps,
} from '../../../../core/components/type-html/opt-group/opt-group.interface';

export interface IOptGroup extends ITypeOptGroup {
  className: 'OptGroup';
  props: TypeOptGroupProps;
  // childNodes: ITypNode[],
}
