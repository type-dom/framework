import { ITypeFragment, ITypeFragmentConfig } from '../../core/type-fragment/type-fragment.interface';

export interface IFragment extends ITypeFragment {
  className: 'Fragment';
}

export interface IFragmentConfig extends ITypeFragmentConfig {
  /*nothing*/
  name?: string;
}
