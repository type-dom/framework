/* this implementation is original ported from https://github.com/logaretm/vue-use-web by Abdelrahman Awad */

// import type { MaybeRefOrGetter } from '@vueuse/shared'
import type { ConfigurableWindow } from '../_configurable';
// import { toValue, tryOnScopeDispose } from '@vueuse/shared'
// import { ref, watchEffect } from 'vue'
import { defaultWindow } from '../_configurable';
import { toValue } from '../toValue';
import { tryOnScopeDispose } from '../tryOnScopeDispose';
import { useSupported } from '../useSupported';
import { effect, MaybeRefOrGetter, signal, watch } from '@type-dom/signals';

/**
 * Reactive Media Query.
 *
 * @see https://vueuse.org/useMediaQuery
 * @param query
 * @param options
 */
export function useMediaQuery(query: MaybeRefOrGetter<string>, options: ConfigurableWindow = {}) {
  const { window = defaultWindow } = options;
  const isSupported = useSupported(() => window && 'matchMedia' in window && typeof window.matchMedia === 'function');

  let mediaQuery: MediaQueryList | undefined;
  const matches = signal(false);

  const handler = (event: MediaQueryListEvent) => {
    matches.set(event.matches);
  };

  const cleanup = () => {
    if (!mediaQuery) {
      return;
    }
    if ('removeEventListener' in mediaQuery) {
      mediaQuery.removeEventListener('change', handler);
    } else {  // @ts-expect-error deprecated API
      mediaQuery.removeListener(handler);
    }
  };

  const stopWatch = effect(() => {
    if (!isSupported.get()) {
      return;
    }

    cleanup();

    mediaQuery = window!.matchMedia(toValue(query) as string);

    if ('addEventListener' in mediaQuery) {
      mediaQuery.addEventListener('change', handler);
    } else { // @ts-expect-error deprecated API
      mediaQuery.addListener(handler);
    }

    matches.set(mediaQuery.matches);
  });

  tryOnScopeDispose(() => {
    stopWatch.run();
    // stopWatch();
    cleanup();
    mediaQuery = undefined;
  });

  return matches;
}
