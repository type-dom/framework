import { MaybeRef } from '../../../reactivity';
import { ITypeFragment, FragmentProps } from '../../../core/components/type-fragment/type-fragment.interface';
import { IChild } from '../../../core/type-node/type-node.interface';

export interface IList extends ITypeFragment {
  className: 'List';
}

export interface ListProps extends FragmentProps {
  data?: MaybeRef<any[] | number | undefined>;
  getter?: (item: any, index?: number) => IChild;
}
