import { ITypeFragment, TypeFragmentProps } from '../../../core/components/type-fragment/type-fragment.interface';

export interface IFragment extends ITypeFragment {
  className: 'Fragment';
}

export interface FragmentProps extends TypeFragmentProps {
  /*nothing*/
  name?: string;
}
