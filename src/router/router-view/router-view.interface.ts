import { ITypeFragment, TypeFragmentProps } from '../../core/type-fragment/type-fragment.interface';

export interface IRouterView extends ITypeFragment {
  className: 'RouterView';
}

export interface RouterViewProps extends TypeFragmentProps {
  height?: string;
  childNodes?: never;
}
