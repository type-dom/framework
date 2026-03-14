import { endBatch, startBatch } from '@type-dom/signals';

/**
 * 批量更新
 * @param fn
 */
export function batch(fn: () => void): void {
  startBatch();
  try {
    fn();
  } finally {
    endBatch();
  }
}
