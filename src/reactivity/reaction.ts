import { computed, effect, setActiveSub } from '@type-dom/signals';

interface ReactionOptions<T = unknown, F extends boolean = boolean> {
  fireImmediately?: F;
  equals?: F extends true
    ? (a: T, b: T | undefined) => boolean
    : (a: T, b: T) => boolean;
  onError?: (error: unknown) => void;
  scheduler?: (fn: () => void) => void;
  once?: boolean;
}

export function reaction<T>(
  dataFn: () => T,
  effectFn: (newValue: T, oldValue: T | undefined) => void,
  options: ReactionOptions<T> = {}
): () => void {
  const {
    scheduler = (fn) => fn(),
    equals = Object.is,
    onError,
    once = false,
    fireImmediately = false,
  } = options;

  let prevValue: T | undefined;
  let version = 0;

  const tracked = computed(() => {
    try {
      return dataFn();
    } catch (error) {
      untracked(() => onError?.(error));
      return prevValue!;
    }
  });

  const dispose = effect(() => {
    const current = tracked.get();
    // first evaluation: if not fireImmediately, just record the current value and skip
    if (version === 0) {
      if (!fireImmediately) {
        prevValue = current;
        version++;
        return;
      }
      // if fireImmediately is true, we fall through to trigger the effect with prevValue possibly undefined
    }

    version++;

    // if values are equal (using provided equals), no need to trigger the effect
    if (equals(current, prevValue as any)) return;

    const oldValue = prevValue;

    untracked(() =>
      scheduler(() => {
        try {
          effectFn(current, oldValue);
        } catch (error) {
          onError?.(error);
        } finally {
          // After the scheduled effect runs, re-evaluate the tracked value (untracked)
          // so that synchronous updates performed by the effect are reflected in prevValue.
          try {
            prevValue = untracked(() => tracked.get());
          } catch (e) {
            // swallow any errors from re-evaluating tracked
          }
          if (once) {
            // dispose after the callback has run once
            dispose();
          }
        }
      })
    );
  });

  return dispose;
}

function untracked<T>(callback: () => T): T {
  const currentSub = setActiveSub(undefined);
  try {
    return callback();
  } finally {
    setActiveSub(currentSub);
  }
}
