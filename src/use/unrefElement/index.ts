import { MaybeRef, MaybeRefOrGetter } from '@type-dom/signals';
import { TypeNode } from '../../core/type-node/type-node.abstract';
import { toValue } from '../toValue';

export type TdInstance = TypeNode;
export type MaybeElementRef<T extends MaybeElement = MaybeElement> = MaybeRef<T>
export type MaybeComputedElementRef<T extends MaybeElement = MaybeElement> = MaybeRefOrGetter<T>
export type MaybeElement = HTMLElement | SVGElement | TdInstance | undefined | null

export type UnRefElementReturn<T extends MaybeElement = MaybeElement> = T extends TdInstance ? Exclude<MaybeElement, TdInstance> : T | undefined

/**
 * Get the dom element of a ref of element or Vue component instance
 *
 * @param elRef
 */
export function unrefElement<T extends MaybeElement>(elRef: MaybeComputedElementRef<T>): T {
  const plain = toValue(elRef);
  return (plain as TdInstance)?.dom as T ?? plain as T;
  // return (elRef as TdInstance)?.dom as T;
}
