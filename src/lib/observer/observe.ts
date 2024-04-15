import { IObData } from '../../interface';
import { Observer } from './observer';
import { isObject } from '@type-dom/utils';

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
export function observe(
  value: IObData,
  // shallow?: boolean,
  // ssrMockReactivity?: boolean
): Observer | undefined {
  console.log('observe . ');
  if (value && value.__ob__ instanceof Observer) {
    return value.__ob__
  }
  // if (
  //   shouldObserve &&
  //   (
  //     // ssrMockReactivity ||
  //     !isServerRendering()) &&
  //   (isArray(value) || isPlainObject(value)) &&
  //   Object.isExtensible(value) &&
  //   !value.__v_skip /* ReactiveFlags.SKIP */// &&
  //   // !isRef(value) &&
  //   // !(value instanceof VNode)
  // ) {
  return new Observer(value, /*shallow, ssrMockReactivity*/)
}
