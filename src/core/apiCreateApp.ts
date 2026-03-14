// import {
//   // type Component,
//   // type ComponentInternalInstance,
//   // type ConcreteComponent,
//   type Data,
//   // getComponentPublicInstance,
//   // getComponentPublicInstance,
//   // validateComponentName,
// } from './component';
// import type {
//   ComponentOptions,
//   MergedComponentOptions,
//   RuntimeCompilerOptions,
// } from './componentOptions'
// import type {
//   ComponentCustomProperties,
//   // ComponentPublicInstance,
// } from './componentPublicInstance'
// import { type Directive, validateDirectiveName } from './directives'
// import type { InjectionKey } from './apiInject'
// import { warn } from './warning'
// import { type VNode, // cloneVNode, createVNode
// } from './vnode'
// import type { RootHydrateFunction } from './hydration'
// import { devtoolsInitApp, devtoolsUnmountApp } from './devtools'
// import { NO, extend, hasOwn, isFunction, isObject } from '@vue/shared'
// import { version } from '.'
// import { installAppCompatProperties } from './compat/global'
// import type { NormalizedPropsOptions } from './componentProps'
// import type { ObjectEmitsOptions } from './componentEmits'
// import { ErrorCodes, callWithAsyncErrorHandling } from './errorHandling'
// import { TypeNode } from './type-node/type-node.abstract';
// import {
//   extend,
//   isFunction,
//   isObject,
//   // NO,
// } from '@type-dom/utils';
// import { RootRenderFunction } from './renderer/render';
// import { ElementNamespace } from './renderer/renderer';
// import { TypeEl } from './type-element/type-element.interface';
import { App } from '../dom/components/app/app.class';
import { TypeElement } from './abstracts/type-element/type-element.abstract';
// import { createAppContext } from '../dom/components/app/createAppContext';
// import type { DefineComponent } from './apiDefineComponent'

export type OptionMergeFunction = (to: unknown, from: unknown) => any

type PluginInstallFunction<Options = any[]> = Options extends unknown[]
  ? (app: App, ...options: Options) => any
  : (app: App, options: Options) => any

export type ObjectPlugin<Options = any[]> = {
  install: PluginInstallFunction<Options>
}
export type FunctionPlugin<Options = any[]> = PluginInstallFunction<Options> &
  Partial<ObjectPlugin<Options>>

export type Plugin<
  Options = any[],
  // TODO: in next major Options extends unknown[] and remove P
  P extends unknown[] = Options extends unknown[] ? Options : [Options],
> = FunctionPlugin<P> | ObjectPlugin<P>

// export type CreateAppFunction<HostElement> = (
//   rootComponent: TypeNode,
//   rootProps?: Data | null,
// ) => App

// let uid = 0
// createApp(App).mount(container)
// export function createAppAPI<HostElement>(
//   render: RootRenderFunction,
//   // hydrate?: RootHydrateFunction,
// ): CreateAppFunction<HostElement> {
  export function createApp(rootComponent: TypeElement) {
    // console.warn('createApp');
    // if (!isFunction(rootComponent)) {
    //   rootComponent = extend({}, rootComponent)
    // }

    // if (rootProps != null && !isObject(rootProps)) {
    //   // __DEV__ &&
    //   warn(`root props passed to app.mount() must be an object.`)
    //   rootProps = null
    // }

    // const context = createAppContext()
    // const installedPlugins = new WeakSet()
    // const pluginCleanupFns: Array<() => any> = []

    // let isMounted = false

    // const app: App = (context.app = {
    //   // _uid: uid++,
    //   // _component: rootComponent as TypeNode,
    //   // _props: rootProps,
    //   // _container: null,
    //   // _context: context,
    //   // _instance: null,
    //
    //   // version,
    //
    //   get config() {
    //     return context.config
    //   },
    //
    //   set config(v) {
    //     // if (__DEV__) {
    //       warn(
    //         `app.config cannot be replaced. Modify individual options instead.`,
    //       )
    //     // }
    //   },
    //
    //   // use(plugin: Plugin, ...options: any[]) {
    //   //   if (installedPlugins.has(plugin)) {
    //   //     // __DEV__ &&
    //   //     warn(`Plugin has already been applied to target app.`)
    //   //   } else if (plugin && isFunction(plugin.install)) {
    //   //     installedPlugins.add(plugin)
    //   //     plugin.install(app, ...options)
    //   //   } else if (isFunction(plugin)) {
    //   //     installedPlugins.add(plugin)
    //   //     plugin(app, ...options)
    //   //   } else { // if (__DEV__) {
    //   //     warn(
    //   //       `A plugin must either be a function or an object with an "install" ` +
    //   //         `function.`,
    //   //     )
    //   //   }
    //   //   return app
    //   // },
    //
    //   // mixin(mixin: ComponentOptions) {
    //   //   if (__FEATURE_OPTIONS_API__) {
    //   //     if (!context.mixins.includes(mixin)) {
    //   //       context.mixins.push(mixin)
    //   //     } else if (__DEV__) {
    //   //       warn(
    //   //         'Mixin has already been applied to target app' +
    //   //           (mixin.name ? `: ${mixin.name}` : ''),
    //   //       )
    //   //     }
    //   //   } else if (__DEV__) {
    //   //     warn('Mixins are only available in builds supporting Options API')
    //   //   }
    //   //   return app
    //   // },
    //
    //   // component(name: string, component?: Component): any {
    //   //   if (__DEV__) {
    //   //     validateComponentName(name, context.config)
    //   //   }
    //   //   if (!component) {
    //   //     return context.components[name]
    //   //   }
    //   //   if (__DEV__ && context.components[name]) {
    //   //     warn(`Component "${name}" has already been registered in target app.`)
    //   //   }
    //   //   context.components[name] = component
    //   //   return app
    //   // },
    //
    //   // directive(name: string, directive?: Directive) {
    //   //   if (__DEV__) {
    //   //     validateDirectiveName(name)
    //   //   }
    //   //
    //   //   if (!directive) {
    //   //     return context.directives[name] as any
    //   //   }
    //   //   if (__DEV__ && context.directives[name]) {
    //   //     warn(`Directive "${name}" has already been registered in target app.`)
    //   //   }
    //   //   context.directives[name] = directive
    //   //   return app
    //   // },
    //
    //   // mount(
    //   //   rootContainer: TypeEl, // HostElement,
    //   //   // isHydrate?: boolean,
    //   //   namespace?: boolean | ElementNamespace,
    //   // ) {
    //   //   if (!isMounted) {
    //   //     // #5571
    //   //     // if (__DEV__ && (rootContainer as any).__vue_app__) {
    //   //     //   warn(
    //   //     //     `There is already an app instance mounted on the host container.\n` +
    //   //     //       ` If you want to mount another app on the same host container,` +
    //   //     //       ` you need to unmount the previous app by calling \`app.unmount()\` first.`,
    //   //     //   )
    //   //     // }
    //   //     const vnode = rootComponent // app._ceVNode || createVNode(rootComponent, rootProps)
    //   //     // store app context on the root VNode.
    //   //     // this will be set on the root instance on initial mount.
    //   //     vnode.appContext = context
    //   //
    //   //     if (namespace === true) {
    //   //       namespace = 'svg'
    //   //     } else if (namespace === false) {
    //   //       namespace = undefined
    //   //     }
    //   //
    //   //     // HMR root reload
    //   //     // if (__DEV__) {
    //   //     //   context.reload = () => {
    //   //     //     const cloned = cloneVNode(vnode)
    //   //     //     // avoid hydration for hmr updating
    //   //     //     cloned.el = null
    //   //     //     // casting to ElementNamespace because TS doesn't guarantee type narrowing
    //   //     //     // over function boundaries
    //   //     //     render(cloned, rootContainer, namespace as ElementNamespace)
    //   //     //   }
    //   //     // }
    //   //
    //   //     // if (isHydrate && hydrate) {
    //   //     //   hydrate(vnode as TypeNode<Node, Element>, rootContainer as any)
    //   //     // } else {
    //   //     // rootContainer = normalizeContainer(rootContainer);
    //   //     //   render(vnode, rootContainer, namespace)
    //   //     // }
    //   //     isMounted = true
    //   //     // app._container = rootContainer
    //   //     // for devtools and telemetry
    //   //     // ;(rootContainer as any).__vue_app__ = app
    //   //
    //   //     // if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
    //   //     //   app._instance = vnode.component
    //   //     //   devtoolsInitApp(app, version)
    //   //     // }
    //   //
    //   //     // return getComponentPublicInstance(vnode.component!)
    //   //     return vnode;
    //   //   } else if (__DEV__) {
    //   //     warn(
    //   //       `App has already been mounted.\n` +
    //   //         `If you want to remount the same app, move your app creation logic ` +
    //   //         `into a factory function and create fresh app instances for each ` +
    //   //         `mount - e.g. \`const createMyApp = () => createApp(App)\``,
    //   //     )
    //   //   }
    //   // },
    //
    //   // onUnmount(cleanupFn: () => void) {
    //   //   if (// __DEV__ &&
    //   //     typeof cleanupFn !== 'function') {
    //   //     warn(
    //   //       `Expected function as first argument to app.onUnmount(), ` +
    //   //         `but got ${typeof cleanupFn}`,
    //   //     )
    //   //   }
    //   //   pluginCleanupFns.push(cleanupFn)
    //   // },
    //
    //   unmount() {
    //     // if (isMounted) {
    //     //   callWithAsyncErrorHandling(
    //     //     pluginCleanupFns,
    //     //     app._instance,
    //     //     ErrorCodes.APP_UNMOUNT_CLEANUP,
    //     //   )
    //     //   render(null, app._container)
    //     //   if (__DEV__ || __FEATURE_PROD_DEVTOOLS__) {
    //     //     app._instance = null
    //     //     devtoolsUnmountApp(app)
    //     //   }
    //     //   delete app._container.__vue_app__
    //     // } else if (__DEV__) {
    //     //   warn(`Cannot unmount an app that is not mounted.`)
    //     // }
    //   },
    //
    //   provide(key, value) {
    //     if (/*__DEV__ && */(key as string | symbol) in context.provides) {
    //       if (hasOwn(context.provides, key as string | symbol)) {
    //         warn(
    //           `App already provides property with key "${String(key)}". ` +
    //             `It will be overwritten with the new value.`,
    //         )
    //       } else {
    //         // #13212, context.provides can inherit the provides object from parent on custom elements
    //         warn(
    //           `App already provides property with key "${String(key)}" inherited from its parent element. ` +
    //             `It will be overwritten with the new value.`,
    //         )
    //       }
    //     }
    //
    //     context.provides[key as string | symbol] = value
    //
    //     return app
    //   },
    //
    //   // runWithContext(fn) {
    //   //   const lastApp = currentApp
    //   //   currentApp = app
    //   //   try {
    //   //     return fn()
    //   //   } finally {
    //   //     currentApp = lastApp
    //   //   }
    //   // },
    // })
    const app = new App({
      slot: rootComponent
    });
    app.component = rootComponent;
    // app.appContext = context;
    // app.config = context.config;
    // context.app = app;
    // if (__COMPAT__) {
    //   installAppCompatProperties(app, context, render)
    // }

    return app
  }
// }

/**
 * @internal Used to identify the current app when using `inject()` within
 * `app.runWithContext()`.
 */
// export let currentApp: App<unknown> | null = null
