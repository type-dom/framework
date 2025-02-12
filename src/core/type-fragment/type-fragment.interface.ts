import { ITypeElement } from '../type-element/type-element.interface';
import { ITypeConfig } from '../type-node/type-node.interface';

export interface ITypeFragment extends ITypeElement {
  props: ITypeFragmentConfig;
}

export interface ITypeFragmentConfig extends ITypeConfig {
  nodeName?: 'fragment';
}
