import { ITypeElement } from '../../type-element/type-element.interface';
import { TypeProps } from '../../type-node/type-node.interface';
import { NodeName } from '../../enums';

export interface ITypeFragment extends ITypeElement {
  props: TypeFragmentProps;
}

export interface TypeFragmentProps extends TypeProps {
  nodeName?: NodeName.FRAGMENT;
}
