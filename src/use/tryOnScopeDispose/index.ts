import { getCurrentScope, onScopeDispose } from '@type-dom/signals';
import { Fn } from '../../interface'

/**
 * Call onScopeDispose() if it's inside an effect scope lifecycle, if not, do nothing
 *
 * @param fn
 */
export function tryOnScopeDispose(fn: Fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true
  }
  return false
}
