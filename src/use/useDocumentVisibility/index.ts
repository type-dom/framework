// import type { Ref } from 'vue'
import { signal, Ref } from '@type-dom/signals';
import type { ConfigurableDocument } from '../_configurable'
// import { ref } from 'vue'
import { defaultDocument } from '../_configurable'
import { useEventListener } from '../useEventListener'

/**
 * Reactively track `document.visibilityState`.
 *
 * @see https://vueuse.org/useDocumentVisibility
 */
export function useDocumentVisibility(options: ConfigurableDocument = {}): Ref<DocumentVisibilityState> {
  const { document = defaultDocument } = options
  if (!document)
    return signal('visible')

  const visibility = signal(document.visibilityState)

  useEventListener(document, 'visibilitychange', () => {
    visibility.set(document.visibilityState)
  })

  return visibility
}
