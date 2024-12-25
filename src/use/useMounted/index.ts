import { signal } from '@type-dom/signals';
import { getCurrentInstance } from '../../core/instance';
import { onMounted } from '../../core/apiLifecycle';

/**
 * Mounted state in ref.
 *
 * @see https://vueuse.org/useMounted
 */
export function useMounted() {
  const isMounted = signal(false);

  const instance = getCurrentInstance();
  if (instance) {
    onMounted(() => {
      isMounted.set(true);
    }, instance);
  }

  return isMounted;
}
