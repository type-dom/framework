// import { HTMLAttributes } from '../../../dom';
// import { ToMaybeRefs } from '../../../reactivity';
// import { NodeName } from '../../enums';
import { ITypeElement } from '../type-element/type-element.interface';
import { TypeProps } from '../type-node/type-node.interface';

export interface ITypeFragment extends ITypeElement {
  props: FragmentProps;
}

export interface FragmentProps extends TypeProps {
  // tag?: NodeName.FRAGMENT;
  // attrObj?: ToMaybeRefs<HTMLAttributes>;
}
