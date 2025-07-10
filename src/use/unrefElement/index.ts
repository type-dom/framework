import { MaybeRef, MaybeRefOrGetter } from '../../reactivity';
import { TypeNode } from '../../core/type-node/type-node.abstract';
import { toValue } from '../shared/toValue/index';

// export type TdInstance = TypeNode;
export type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>
export type MaybeComputedElementRef<T extends MaybeElement = MaybeElement> = MaybeRefOrGetter<T>
export type MaybeElement = HTMLElement | SVGElement | Text | TypeNode | null | undefined

export type UnRefElementReturn<T extends MaybeElement = MaybeElement> = T extends TypeNode ? Exclude<MaybeElement, TypeNode> : T | undefined

/**
 * Get the dom element of a ref of element or Vue component instance
 *
 * @param elRef
 */
export function unrefElement<T extends MaybeElement>(elRef: MaybeComputedElementRef<T>): UnRefElementReturn<T> {
  const plain = toValue(elRef);
  return ((plain as TypeNode)?.dom ?? plain )as UnRefElementReturn<T>;
}
