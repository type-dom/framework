import { AnyFn, hasOwn, isFunction } from '@type-dom/utils';
import { transformSlot } from '../../../core/helpers/transformSlot';
import type { InjectionKey } from '../../../core/apiInject';
import { TypeFragment } from '../../../core/components/type-fragment/type-fragment.abstract';
import { TypeNode } from '../../../core/type-node/type-node.abstract';
import { warn } from '../../../core/warning';
import type { Plugin } from '../../../core/apiCreateApp';
import { createAppContext } from './createAppContext';
import { AppConfig, AppContext, AppProps, IApp } from './app.interface';

export class App extends TypeFragment<AppProps> implements IApp {
  className: 'App';
  override appContext: AppContext;
  override config: AppConfig;
  component?: TypeNode;
  constructor(params: AppProps = {}) {
    super(params);
    this.className = 'App';
    const context = createAppContext();
    context.app = this;
    this.appContext = context;
    this.config = context.config;
    transformSlot(this, params.slot);
  }

  use(plugin: Plugin, ...options: any[]) {
    if (installedPlugins.has(plugin)) {
      // __DEV__ &&
      warn(`Plugin has already been applied to target app.`)
    } else if (plugin && isFunction(plugin.install)) {
      installedPlugins.add(plugin)
      plugin.install(this, ...options)
    } else if (isFunction(plugin)) {
      installedPlugins.add(plugin)
      plugin(this, ...options)
    } else { // if (__DEV__) {
      warn(
        `A plugin must either be a function or an object with an "install" ` +
          `function.`,
      )
    }
    return this;
  }
  provide<T, K = InjectionKey<T> | string | number>(key: K, value: K extends InjectionKey<infer V> ? V : T) {
    const context = this.appContext;
    if (/*__DEV__ && */(key as string | symbol) in context.provides) {
      if (hasOwn(context.provides, key as string | symbol)) {
        warn(
          `App already provides property with key "${String(key)}". ` +
          `It will be overwritten with the new value.`,
        )
      } else {
        // #13212, context.provides can inherit the provides object from parent on custom elements
        warn(
          `App already provides property with key "${String(key)}" inherited from its parent element. ` +
          `It will be overwritten with the new value.`,
        )
      }
    }

    context.provides[key as string | symbol] = value

    return this;
  }

  runWithContext(fn: AnyFn) {
    const lastApp = currentApp
    currentApp = this as App;
    try {
      return fn()
    } finally {
      currentApp = lastApp
    }
  }
}

const installedPlugins = new WeakSet()
/**
 * @internal Used to identify the current app when using `inject()` within
 * `app.runWithContext()`.
 */
export let currentApp: App | null = null
