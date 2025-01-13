import { isFunction } from '@type-dom/utils';
import { warn } from '../util/debug'
import { currentInstance } from './instance'
import { Signal } from '@type-dom/signals';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface InjectionConstraint<T> {/*empty*/}

export type InjectionKey<T> = symbol & InjectionConstraint<T>

export function provide<T, K = InjectionKey<T> | string | number>(
  key: K,
  value: K extends InjectionKey<infer V> ? V : T,
): void {
  if (!currentInstance) {
    warn(`provide() can only be used inside setup().`)
  } else {
    if (currentInstance.provides === undefined) {
      currentInstance.provides = {}
    }
    currentInstance.provide(key, value);
    // let provides = currentInstance.provides;
    // // by default an instance inherits its parent's provides object
    // // but when it needs to provide values of its own, it creates its
    // // own provides object using parent provides object as prototype.
    // // this way in `inject` we can simply look up injections from direct
    // // parent and let the prototype chain do the work.
    // const parentProvides =
    //   currentInstance.parent && currentInstance.parent.provides
    // if (parentProvides === provides) {
    //   provides = currentInstance.provides = Object.create(parentProvides)
    // }
    // // TS doesn't allow symbol as index type
    // provides[key as string] = value
  }
}

export function inject<T>(key: InjectionKey<T> | string): T | undefined
export function inject<T>(
  key: InjectionKey<T> | string,
  defaultValue: T | undefined,
  treatDefaultAsFactory?: false,
): T
export function inject<T>(
  key: InjectionKey<T> | string,
  defaultValue: T | (() => T),
  treatDefaultAsFactory: true,
): T
export function inject(
  key: InjectionKey<any> | string,
  defaultValue?: unknown,
  treatDefaultAsFactory = false,
): any {
  // fallback to `currentRenderingInstance` so that this can be called in
  // a functional component
  const instance = currentInstance; // || currentRenderingInstance

  // also support looking up from app-level provides w/ `app.runWithContext()`
  if (instance /* || currentApp */) {
    return instance.inject(key, defaultValue, treatDefaultAsFactory);
    // #2400
    // to support `app.use` plugins,
    // fallback to appContext's `provides` if the instance is at root
    // #11488, in a nested createApp, prioritize using the provides from currentApp
    // const provides = currentApp
    //   ? currentApp._context.provides
    //   : instance
    //     ? instance.parent == null
    //       ? instance.vnode.appContext && instance.vnode.appContext.provides
    //       : instance.parent.provides
    //     : undefined
    // const provides = instance.upProvides;
    // if (provides) {
    //   if ((key as string | symbol) in provides) {
    //     // TS doesn't allow symbol as index type
    //     return provides[key]
    //   } else {
    //     // todo
    //     return instance.parent?.inject(key, defaultValue);
    //   }
    //
    // } else if (arguments.length > 1) { // todo 加入到 instance.inject 方法中
    //   return treatDefaultAsFactory && isFunction(defaultValue)
    //     ? defaultValue.call(instance && instance.proxy)
    //     : defaultValue
    // } else if (__DEV__) {
    //   warn(`injection "${String(key)}" not found.`)
    // }
  } else {
    warn(`inject() can only be used inside setup() or functional components.`)
  }
}

/**
 * Returns true if `inject()` can be used without warning about being called in the wrong place (e.g. outside of
 * setup()). This is used by libraries that want to use `inject()` internally without triggering a warning to the end
 * user. One example is `useRoute()` in `vue-router`.
 */
export function hasInjectionContext(): boolean {
  return !!(currentInstance); // || currentRenderingInstance || currentApp)
}
