import { computed } from '@type-dom/signals';
import { useMounted } from '../useMounted';

export function useSupported(callback: () => unknown) {
  const isMounted = useMounted();

  return computed(() => {
    // to trigger the ref
    isMounted.get();
    return Boolean(callback());
  });
}
