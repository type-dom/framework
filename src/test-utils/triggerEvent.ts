// import { isArray } from '@vue/shared'
// import { isArray } from '@type-dom/utils';
// import type { TestElement } from './nodeOps'
import { TypeNode } from '../';

export function triggerEvent(
  el: TypeNode,
  event: string,
  payload: any[] = [],
): void {
  const { eventObservers } = el
  // console.log('eventObservers', eventObservers)
  if (eventObservers) {
    const listenerMap = eventObservers[event];
    // console.log('listenerMap', listenerMap)
    listenerMap?.keys().forEach((listener) => {
      // console.log('listener', listener)
      listener?.(...payload)
    })

    // if (listener) {
    //   if (isArray(listener)) {
    //     for (let i = 0; i < listener.length; i++) {
    //       listener[i](...payload)
    //     }
    //   } else {
    //     listener(...payload)
    //   }
    // }
  }
}
