import { Fn } from '@type-dom/utils';
import { nextTick } from '../../../core/scheduler';
import { onMounted } from '../../../core/apiLifecycle'
// import { nextTick, onMounted } from 'vue'
import { getLifeCycleTarget } from '../../utils'

/**
 * Call onMounted() if it's inside a component lifecycle, if not, just call the function
 *
 * @param fn
 * @param sync if set to false, it will run in the nextTick() of Vue
 * @param target
 */
export function tryOnMounted(fn: Fn, sync = true, target?: any) {
  const instance = getLifeCycleTarget()
  if (instance) {
    onMounted(fn, target)
  } else {
    if (sync) {
      fn()
    } else {
      nextTick(fn)
    }
  }
}
