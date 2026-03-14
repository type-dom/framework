import { isFunction } from '@type-dom/utils';
import { currentApp } from '../dom/components/app/app.class';
import { warn } from './warning'
import { currentInstance } from './component';
import { TypeNode } from './abstracts/type-node/type-node.abstract';

/**
 * 标记类型：用于唯一标识依赖注入的键
 * 通过品牌化技术确保类型安全（仅通过特定方法创建的 symbol 可被接受）
 */
interface InjectionConstraint<_T> {
  // 品牌化属性（运行时无实际作用，仅用于类型系统约束）
  readonly __injectionKeyBrand?: unique symbol;
}

/**
 * 依赖注入键类型：关联注入值的类型 T 与唯一 symbol 标识
 * 示例：const myKey = Symbol() as InjectionKey<MyService>;
 */
export type InjectionKey<T> = symbol & InjectionConstraint<T>

export function provide<T, K = InjectionKey<T> | string | number>(
  key: K,
  value: K extends InjectionKey<infer V> ? V : T,
  instance = currentInstance
): void {
  // console.warn('provide . key is ', key);
  if (!instance) {
    warn(`provide() can only be used inside setup().`);
  } else {
    let provides = instance.provides = instance.provides ?? {};
    // by default an instance inherits its parent's provides object
    // but when it needs to provide values of its own, it creates its
    // own provides object using parent provides object as prototype.
    // this way in `inject` we can simply look up injections from direct
    // parent and let the prototype chain do the work.
    const parentProvides =
      instance.parent && instance.parent.provides;
    if (parentProvides === provides) {
      provides = instance.provides = Object.create(parentProvides);
    }
    // TS doesn't allow symbol as index type
    provides[key as string] = value;
  }
}
/**
 * 注入
 * 依赖 parent 递归注入
 * 要在 setup 中调用，否则可能会parent没有初始化。
 * @param key
 */
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
  // if (instance) {
  //   return useInject(instance, key, defaultValue, treatDefaultAsFactory);
  // } else {
  //   warn(`inject() can only be used inside setup() or functional components.`)
  // }

  // also support looking up from app-level provides w/ `app.runWithContext()`
  if (instance || currentApp) {
    // #2400
    // to support `app.use` plugins,
    // fallback to appContext's `provides` if the instance is at root
    // #11488, in a nested createApp, prioritize using the provides from currentApp
    // #13212, for custom elements we must get injected values from its appContext
    // as it already inherits the provides object from the parent element
    const provides = currentApp
      ? currentApp.appContext.provides
      : instance
        ? instance.parent == null
          ? instance.appContext && instance.appContext.provides
          : instance.parent.provides
        : undefined;

    if (provides && (key as string | symbol) in provides) {
      // TS doesn't allow symbol as index type
      return provides[key];
    } else if (recursiveLookup(instance?.parent, key)) {
      return recursiveLookup(instance?.parent, key);
    } else if (arguments.length > 1) { // todo 加入到 instance.inject 方法中
      return treatDefaultAsFactory && isFunction(defaultValue)
        ? defaultValue.call(instance) // && instance.proxy)
        : defaultValue;
    } else { // if (__DEV__) {
      warn(`injection "${String(key)}" not found.`);
    }
  } else {
    warn(`inject() can only be used inside setup() or functional components.`);
  }
}

/**
 * Returns true if `inject()` can be used without warning about being called in the wrong place (e.g. outside of
 * setup()). This is used by libraries that want to use `inject()` internally without triggering a warning to the end
 * user. One example is `useRoute()` in `vue-router`.
 */
export function hasInjectionContext(): boolean {
  return !!(currentInstance || currentApp); // || currentRenderingInstance || currentApp)
}

function recursiveLookup(instance: TypeNode | null | undefined, key: string | symbol): any {
  if (!instance) return undefined;

  // 检查当前实例
  if (instance.provides?.[key]) {
    return instance.provides[key];
  }

  // 递归查找父级
  return recursiveLookup(instance.parent, key);
}
