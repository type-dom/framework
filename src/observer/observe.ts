import { TypeNode } from '../core/type-node/type-node.abstract';
import { IObData } from '../interface';
import { Observer } from './observer';
import { isArray, isObject, isPlainObject } from '@type-dom/utils';
import { isServerRendering } from '../util/env';
import { isRef } from './util';

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
export const shouldObserve = true;

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
export function observe(
  value: IObData,
  shallow?: boolean,
  ssrMockReactivity?: boolean
): Observer | undefined {
  console.log('observe function begins . ');
  if (value && value.__ob__ instanceof Observer) {
    return value.__ob__;
  }
  if (
    shouldObserve &&
    (ssrMockReactivity || !isServerRendering()) &&
    (isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value.__v_skip /* ReactiveFlags.SKIP */ &&
    !isRef(value) &&
    !(value instanceof TypeNode)
  ) {
    return new Observer(value, shallow, ssrMockReactivity);
  } else {
    return undefined;
  }
}
