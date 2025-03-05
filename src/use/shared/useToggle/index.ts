// import type { Ref } from 'vue'
// import type { MaybeRef, MaybeRefOrGetter } from '../utils'
// import { isRef, ref } from 'vue'
import { toValue } from '../toValue/toValue'
import { isRef, MaybeRef, MaybeRefOrGetter, signal, Signal } from '@type-dom/signals';

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

  const valueIsRef = isRef(initialValue)
  const _value = signal(initialValue) as Signal<boolean>

  function toggle(value?: boolean) {
    // has arguments
    if (arguments.length) {
      _value.set(value!)
      return _value.get()
    } else {
      const truthy = toValue(truthyValue)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      _value.set(_value.get() === truthy)
        ? toValue(falsyValue)
        : truthy
      return _value.get()
    }
  }

  if (valueIsRef) {
    return toggle
  } else {
    return [_value, toggle] as const
  }
}
