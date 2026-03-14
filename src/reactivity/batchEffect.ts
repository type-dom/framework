import {effect, endBatch, startBatch} from '@type-dom/signals';

export function batchEffect(fn: () => void) {
  return effect(() => {
    startBatch();
    try {
      return fn();
    } finally {
      endBatch();
    }
  });
}
