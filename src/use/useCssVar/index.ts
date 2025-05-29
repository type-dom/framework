import { MaybeRefOrGetter, signal, computed, watch } from '@type-dom/signals';
import type { ConfigurableWindow } from '../_configurable'
import type { MaybeElementRef } from '../unrefElement'
// import { computed, shallowRef, toValue, watch } from 'vue'
import { defaultWindow } from '../_configurable'
import { unrefElement } from '../unrefElement'
import { useMutationObserver } from '../useMutationObserver'
import { toValue } from '../shared';

export interface UseCssVarOptions extends ConfigurableWindow {
  initialValue?: string
  /**
   * Use MutationObserver to monitor variable changes
   * @default false
   */
  observe?: boolean
}

/**
 * Manipulate CSS variables.
 *
 * @see https://vueuse.org/useCssVar
 * @param prop
 * @param target
 * @param options
 */
export function useCssVar(
  prop: MaybeRefOrGetter<string | null | undefined>,
  target?: MaybeElementRef,
  options: UseCssVarOptions = {},
) {
  const { window = defaultWindow, initialValue, observe = false } = options
  const variable = signal(initialValue)
  const elRef = computed(() => unrefElement(target) || window?.document?.documentElement)

  function updateCssVar() {
    const key = toValue(prop)
    const el = toValue(elRef) as HTMLElement;
    if (el && window && key) {
      const value = window.getComputedStyle(el).getPropertyValue(key)?.trim()
      variable.set(value || variable.get() || initialValue)
    }
  }

  if (observe) {
    useMutationObserver(elRef, updateCssVar, {
      attributeFilter: ['style', 'class'],
      window,
    })
  }

  watch(
    () => [elRef.get(), toValue(prop)],
    (_, old) => {
      if (old?.[0] && old?.[1]) {
        (old[0] as HTMLElement).style.removeProperty(old[1] as string);
      }
      updateCssVar()
    },
    { immediate: true },
  )

  watch(
    () => [variable.get(), elRef.get()],
    ([val, el]) => {
      const raw_prop = toValue(prop)
      if ((el as HTMLElement)?.style && raw_prop) {
        if (val == null)
          (el as HTMLElement).style.removeProperty(raw_prop)
        else
          (el as HTMLElement).style.setProperty(raw_prop, val as string)
      }
    },
    { immediate: true },
  )

  return variable
}
