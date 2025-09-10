import { MaybeRef } from '../../../reactivity';
import { ITypeFragment, TypeFragmentProps } from '../../../core/components/type-fragment/type-fragment.interface';
import { IChild } from '../../../core/type-node/type-node.interface';

export interface IList extends ITypeFragment {
  className: 'List';
}

export interface ListProps extends TypeFragmentProps {
  data?: MaybeRef<any[] | number | undefined>;
  getter?: (item: any, index?: number) => IChild;
}
