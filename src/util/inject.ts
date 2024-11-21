// packages/runtime-core/src/apiInject.ts


import { getCurrentInstance, hasInjectionContext, InjectionKey } from '@type-dom/framework';
import { isFunction } from '@type-dom/utils';

export function inject<T>(
  key: InjectionKey<T> | string | symbol,
  defaultValue?: T | (() => T) | undefined,
  treatDefaultAsFactory?: boolean
): T {
  const instance = getCurrentInstance()
  if (!instance || !hasInjectionContext(instance)) {
    return defaultValue as T;
  }

  let provides = instance.provides
  const parentProvides = instance.parent?.provides

  // fallback to parent provides
  if (parentProvides === provides) {
    provides = parentProvides
  }

  const injected = provides?.[key];

  if (!injected) {
    if (defaultValue !== undefined) {
      if (treatDefaultAsFactory && isFunction(defaultValue)) {
        return (defaultValue as any)()
      } else {
        return defaultValue as T
      }
    }
  }
  // else if (isReactive(injected)) {
  //   // injected value is a reactive object
  //   // track(provides, 'get', key)
  // }

  return injected as T;
}
