import { ITypeFragment, TypeFragmentProps } from '../../../core/components/type-fragment/type-fragment.interface';
import { TypeNode } from '../../../core/type-node/type-node.abstract';

export interface IKeepAlive extends ITypeFragment {
  className: 'KeepAlive';
}


type MatchPattern = string | RegExp | (string | RegExp)[]

export interface KeepAliveProps extends TypeFragmentProps {
  include?: MatchPattern
  exclude?: MatchPattern
  max?: number | string
}

export type CacheKey = PropertyKey | TypeNode; // | ConcreteComponent;


export type Cache = Map<CacheKey, TypeNode>
export type Keys = Set<CacheKey>
