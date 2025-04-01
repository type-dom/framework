import { isObject } from '@type-dom/utils';
import { warn } from '../utils/debug';
import { currentInstance } from './instance';

export function defineExpose<T>(exposed: T): void {
  if (currentInstance) {
    if (isObject(exposed)) {
      for (const key in exposed) {
        Object.defineProperty(currentInstance, key, {
          value: exposed[key as keyof T],
          configurable: true,
        })
      }
    }
  } else {
    warn(`provide() can only be used inside setup().`)
  }
}
