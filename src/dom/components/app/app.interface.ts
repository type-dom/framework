import { AnyFn } from '@type-dom/utils';
import { InjectionKey } from '../../../core/apiInject';
import {
  FragmentProps,
  ITypeFragment,
} from '../../../core/components/type-fragment/type-fragment.interface';

// import { ElementNamespace } from '../../../core/renderer/renderer';
import type { ComponentCustomProperties } from '../../../core/componentPublicInstance';
import { TypeNode } from '../../../core/type-node/type-node.abstract';
import type {
  ComponentOptions,
  MergedComponentOptions,
  RuntimeCompilerOptions,
} from '../../../core/componentOptions';
import type { NormalizedPropsOptions } from '../../../core/componentProps';
import type { ObjectEmitsOptions } from '../../../core/componentEmits';
import { App } from './app.class';

export type OptionMergeFunction = (to: unknown, from: unknown) => any

export interface IApp extends ITypeFragment {
  // version: string
  config?: AppConfig

  // use<Options extends unknown[]>(
  //   plugin: Plugin<Options>,
  //   ...options: NoInfer<Options>
  // ): this
  // use<Options>(plugin: Plugin<Options>, options: NoInfer<Options>): this
  // mount(
  //   rootContainer: TypeEl,
  //   /**
  //    * @internal
  //    */
  //   // isHydrate?: boolean,
  //   /**
  //    * @internal
  //    */
  //   namespace?: boolean | ElementNamespace,
  //   /**
  //    * @internal
  //    */
  //   // vnode?: TypeNode,
  // ): TypeNode | undefined;
  // unmount(): void
  // onUnmount(cb: () => void): void
  provide<T, K = InjectionKey<T> | string | number>(
    key: K,
    value: K extends InjectionKey<infer V> ? V : T,
  ): this
}

export interface AppProps extends FragmentProps {
  inject?: any;
  provide?(): any;
}

export interface AppConfig {
  // @private
  readonly isNativeTag: (tag: string) => boolean

  performance: boolean
  optionMergeStrategies: Record<string, OptionMergeFunction>
  globalProperties: ComponentCustomProperties & Record<string, any>
  errorHandler?: (
    err: unknown,
    instance: TypeNode | null,
    info: string,
  ) => void
  warnHandler?: (
    msg: string,
    instance: TypeNode | null,
    trace: string,
  ) => void

  /**
   * Options to pass to `@vue/compiler-dom`.
   * Only supported in runtime compiler build.
   */
  compilerOptions: RuntimeCompilerOptions

  /**
   * @deprecated use config.compilerOptions.isCustomElement
   */
  isCustomElement?: (tag: string) => boolean

  /**
   * TODO document for 3.5
   * Enable warnings for computed getters that recursively trigger itself.
   */
  warnRecursiveComputed?: boolean

  /**
   * Whether to throw unhandled errors in production.
   * Default is `false` to avoid crashing on any error (and only logs it)
   * But in some cases, e.g. SSR, throwing might be more desirable.
   */
  throwUnhandledErrorInProduction?: boolean

  /**
   * Prefix for all useId() calls within this app
   */
  idPrefix?: string
}

export interface AppContext {
  app: App | null // for devtools
  config: AppConfig
  // mixins: ComponentOptions[]
  // components: Record<string, Component>
  // directives: Record<string, Directive>
  provides: Record<string | symbol, any>

  /**
   * Cache for merged/normalized component options
   * Each app instance has its own cache because app-level global mixins and
   * optionMergeStrategies can affect merge behavior.
   * @internal
   */
  optionsCache: WeakMap<ComponentOptions, MergedComponentOptions>
  /**
   * Cache for normalized props options
   * @internal
   */
  propsCache: WeakMap<TypeNode, NormalizedPropsOptions>
  /**
   * Cache for normalized emits options
   * @internal
   */
  emitsCache: WeakMap<TypeNode, ObjectEmitsOptions | null>
  /**
   * HMR only
   * @internal
   */
  reload?: () => void
  /**
   * v2 compat only
   * @internal
   */
  filters?: Record<string, AnyFn>
}
