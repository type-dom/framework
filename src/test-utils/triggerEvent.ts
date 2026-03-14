// import { isArray } from '@vue/shared'
import { isArray } from '@type-dom/utils';
// import type { TestElement } from './nodeOps'
import { TypeNode } from '../';

export function triggerEvent(
  el: TypeNode,
  event: string,
  payload: any[] = [],
): void {
  const { eventListeners } = el;
  if (eventListeners) {
    const listener = eventListeners[event];
    if (listener) {
      if (isArray(listener)) {
        for (let i = 0; i < listener.length; i++) {
          listener[i](...payload);
        }
      } else {
        listener(...payload);
      }
    }
  }
}
