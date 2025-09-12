import { warn } from './warning'
import { currentInstance } from './component'
import { TypeNode } from './type-node/type-node.abstract';
import { isFunction } from '@type-dom/utils';

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
    warn(`provide() can only be used inside setup().`)
  } else {
    let provides = instance.provides = instance.provides ?? {};
    // by default an instance inherits its parent's provides object
    // but when it needs to provide values of its own, it creates its
    // own provides object using parent provides object as prototype.
    // this way in `inject` we can simply look up injections from direct
    // parent and let the prototype chain do the work.
    const parentProvides =
      instance.parent && instance.parent.provides
    if (parentProvides === provides) {
      provides = instance.provides = Object.create(parentProvides)
    }
    // TS doesn't allow symbol as index type
    provides[key as string] = value
  }
}
/**
 * 注入
 * 依赖 parent 递归注入
 * 要在 created 中调用，否则可能会parent没有初始化。
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

  // also support looking up from app-level provides w/ `app.runWithContext()`
  if (instance /* || currentApp */) {
    return useInject(instance, key, defaultValue, treatDefaultAsFactory);
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
  return !!currentInstance; // || currentRenderingInstance || currentApp)
}
function useInject<T>(
  node: TypeNode | undefined,
  key: InjectionKey<T> | string,
  defaultValue?: T,
  treatDefaultAsFactory = false): T {
  if (node?.upProvides) { // 上一级 有 provides 的组件；
    if (node.upProvides[key]) {
      return node.upProvides[key] as T;
    } else { // 多级 存在 provides 的情况，需要递归查找。
      const context = useInject(node.parent, key, defaultValue, treatDefaultAsFactory);
      if (context) {
        return context as T;
      } else {
        return treatDefaultAsFactory && isFunction(defaultValue)
          ? defaultValue.call(node) as T
          : defaultValue as T;
      }
    }
  } else {
    return treatDefaultAsFactory && isFunction(defaultValue)
      ? defaultValue.call(node) as T
      : defaultValue as T;
  }
}
