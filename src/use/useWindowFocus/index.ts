// import type { Ref } from 'vue'
import type { ConfigurableWindow } from '../_configurable'
// import { ref } from 'vue'
import { defaultWindow } from '../_configurable'
import { useEventListener } from '../useEventListener'
import { signal, Ref } from '@type-dom/signals';

/**
 * Reactively track window focus with `window.onfocus` and `window.onblur`.
 *
 * @see https://vueuse.org/useWindowFocus
 */
export function useWindowFocus(options: ConfigurableWindow = {}): Ref<boolean> {
  const { window = defaultWindow } = options
  if (!window)
    return signal(false)

  const focused = signal(window.document.hasFocus())

  useEventListener(window, 'blur', () => {
    focused.set(false)
  })

  useEventListener(window, 'focus', () => {
    focused.set(true)
  })

  return focused
}
