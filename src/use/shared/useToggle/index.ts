// import type { Ref } from 'vue'
// import type { MaybeRef, MaybeRefOrGetter } from '../utils'
// import { isRef, ref } from 'vue'
import { signal, Signal } from '@type-dom/signals';
import { MaybeRef, MaybeRefOrGetter, isRef, unref } from '../../../reactivity';
import { toValue } from '../toValue/index'

export interface UseToggleOptions<Truthy, Falsy> {
  truthyValue?: MaybeRefOrGetter<Truthy>
  falsyValue?: MaybeRefOrGetter<Falsy>
}

export function useToggle<Truthy, Falsy, T = Truthy | Falsy>(initialValue: Signal<T>, options?: UseToggleOptions<Truthy, Falsy>): (value?: T) => T
export function useToggle<Truthy = true, Falsy = false, T = Truthy | Falsy>(initialValue?: T, options?: UseToggleOptions<Truthy, Falsy>): [Signal<T>, (value?: T) => T]

/**
 * A boolean ref with a toggler
 *
 * @see https://vueuse.org/useToggle
 * @param [initialValue]
 */
export function useToggle(
  initialValue: MaybeRef<boolean> = false,
  options: UseToggleOptions<true, false> = {},
) {
  const {
    truthyValue = true,
    falsyValue = false,
  } = options

  const valueIsRef = isRef(initialValue);
  const _value: Signal<boolean | undefined> = signal(unref(initialValue))

  function toggle(value?: boolean) {
    // has arguments
    if (arguments.length) {
      _value.set(value!)
      return _value.get()
    } else {
      const truthy = toValue(truthyValue)
      _value.set(_value.get() === truthy
        ? toValue(falsyValue)
        : truthy)
      return _value.get()
    }
  }

  if (valueIsRef) {
    return toggle
  } else {
    return [_value, toggle] as const
  }
}
