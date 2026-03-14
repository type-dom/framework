import { AnyFn, hasOwn, isFunction } from '@type-dom/utils';
import type { InjectionKey } from '../../../core/apiInject';
import { TypeFragment } from '../../../core/abstracts/type-fragment/type-fragment.abstract';
import { TypeNode } from '../../../core/abstracts/type-node/type-node.abstract';
import { warn } from '../../../core/warning';
import type { Plugin } from '../../../core/apiCreateApp';
import { callWithAsyncErrorHandling, ErrorCodes } from '../../../core/errorHandling';
// import { callWithAsyncErrorHandling, ErrorCodes } from '../../../core/errorHandling';
import { createAppContext } from './createAppContext';
import { AppConfig, AppContext, AppProps, IApp } from './app.interface';

export class App extends TypeFragment<AppProps> implements IApp {
  className: 'App';
  override appContext: AppContext;
  override config: AppConfig;
  component?: TypeNode;
  installedPlugins: WeakSet<WeakKey>;
  pluginCleanupFns: any[];
  constructor(params: AppProps = {}) {
    super(params);
    this.className = 'App';
    const context = createAppContext();
    context.app = this;
    this.appContext = context;
    this.config = context.config;
    this.provides = context.provides;
    this.installedPlugins = new WeakSet();
    this.pluginCleanupFns = [];
  }

  use(plugin: Plugin, ...options: any[]) {
    // console.warn('App use plugin .');
    if (this.installedPlugins.has(plugin)) {
      // __DEV__ &&
      warn(`Plugin has already been applied to target app.`)
    } else if (plugin && isFunction(plugin.install)) {
      this.installedPlugins.add(plugin);
      plugin.install(this, ...options);
    } else if (isFunction(plugin)) {
      this.installedPlugins.add(plugin);
      plugin(this, ...options);
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
  onUnmount(cleanupFn: () => void) {
    if (// __DEV__ &&
      typeof cleanupFn !== 'function') {
      warn(
        `Expected function as first argument to app.onUnmount(), ` +
          `but got ${typeof cleanupFn}`,
      )
    }
    this.pluginCleanupFns.push(cleanupFn);
  }

  override unmount() { // todo
    if (this.isMounted) {
      callWithAsyncErrorHandling(
        this.pluginCleanupFns,
        this,
        // this._instance,
        ErrorCodes.APP_UNMOUNT_CLEANUP,
      )
      // render(null, this._container)
      // if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
      //   this._instance = null
      //   devtoolsUnmountApp(app)
      // }
      // delete app._container.__vue_app__
    } else { // if (__DEV__) {
      warn(`Cannot unmount an app that is not mounted.`)
    }
    super.unmount();
  }
}

/**
 * @internal Used to identify the current app when using `inject()` within
 * `app.runWithContext()`.
 */
export let currentApp: App | null = null
