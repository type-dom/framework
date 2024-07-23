/**
 * 路由器类，负责处理应用程序中的路由变化。
 * 根据不同的模式（hash或history），管理页面的导航和路由呈现。
 */
import { TypeElement } from '../core/type-element/type-element.abstract';
import type { IRoute } from './route.interface';
import type { IRouterOption, IRouter } from './router.interface';
import { findMatchingRoute, formatRoutes, loadRoute } from './util';

/**
 * 创建一个路由器类
 */
export class Router implements IRouter {
  root?: TypeElement; // 应用程序的根元素
  routes: IRoute[]; // 路由配置数组
  mode: 'hash' | 'history' = 'hash';
  // popstate 监听时需要获取最后一次的路由变化。
  private lastPath: { from: string; to: string }; // 记录上一个和当前的路由路径，用于popstate事件处理

  /**
   * 构造函数，初始化路由器实例。
   * @param option 路由器的配置选项，包括路由模式和路由配置数组。
   */
  constructor(option: IRouterOption) {
    this.routes = option.routes;
    if (option.history) {
      this.mode = 'history';
    }
    this.lastPath = {
      from: '/',
      to: window.location.pathname,
    };
  }

  /**
   * 初始化路由器，将路由配置应用到根元素。
   * router的根不一定是 TypeRoot, 也可以是某个页面
   * @param root 根路由挂载的对象
   */
  init(root: TypeElement) {
    this.root = root;
    formatRoutes(this.routes, root);
    console.log('this.routes is ', this.routes);
    root.routerView?.setLoaded(false);
    // 创建一个可观察的路由状态
    // 当打包后, dist测试时；路由为 /apps/ui-doc/index.html 时
    let path: string;
    if (this.mode === 'hash') {
      path = window.location.hash.replace(/^#/, '') || '/'; // 兼容path === '';
      /**
       * 只有监听的方式，后退、前进操作才会加载路由组件；
       */
      window.addEventListener('hashchange', (evt) => {
        console.log('hashchange， evt is ', evt);
        const oldUrl = evt.oldURL;
        const newUrl = evt.newURL;
        const to = newUrl.split('#')[1];
        const from = oldUrl.split('#')[1];
        this.handleRouteChange(to, from);
      });
    } else {
      path = window.location.pathname;
      // 监听路由变化事件
      // popstate事件。这个事件会在执行history.back()、history.forward()或history.go()方法，以及用户点击浏览器的前进或后退按钮时触发。但是，直接使用pushState或replaceState时，这个事件不会触发，因此需要额外的管理机制来处理这些情况。
      window.addEventListener('popstate', (evt) => {
        console.log('popstate, evt is ', evt);
        path = window.location.pathname;
        const { from, to } = this.lastPath;
        if (path === to) {
          // 前进
          this.handleRouteChange(to, from);
        } else if (path === from) {
          // 后退
          this.handleRouteChange(path, to);
        } else {
          this.handleRouteChange(path, to);
        }
        this.lastPath = evt.state;
      });
    }
    if (path.endsWith('/index.html')) {
      path = '/';
    }
    this.handleRouteChange(path);
  }

  /**
   * 处理路由变化，根据当前路径加载对应的路由组件。
   * 当路由改变时，此函数负责根据新的路由路径找到对应的路由配置，并执行相应的加载操作。
   * @param to 新的路由路径，以字符串形式传递。
   * @param from 上一个路由路径，以字符串形式传递。
   * @param type
   */
  handleRouteChange(
    to: string,
    from?: string,
    type: 'push' | 'replace' = 'push'
  ) {
    // 移除路径中的#符号，这通常是URL中的锚点符号，不参与路由匹配。
    console.log('handleRouteChange . to is ', to);
    if (to === from) {
      return;
    }
    // 根据路由定位到对应的component（组件）
    const toRoute = findMatchingRoute(to.replace(/^#/, ''), this.routes);
    if (toRoute) {
      // 如果路由配置中存在重定向，则直接进行重定向操作，不再加载当前路由的组件。
      if (toRoute?.redirect) {
        // console.log('route.redirect is ', route.redirect);
        toRoute?.routerView?.loadRoute(toRoute).then(() => {
          if (type === 'push') {
            toRoute.redirect && this.push(toRoute.redirect);
          } else {
            toRoute.redirect && this.replace(toRoute.redirect);
          }
        });
        return;
      }
      if (from) {
        const fromRoute = findMatchingRoute(
          from?.replace(/^#/, '') || '/',
          this.routes
        );
        console.error('from is ', from, ' , fromRoute is ', fromRoute);
        // todo
        if (fromRoute === toRoute.parent) {
          fromRoute?.routerView?.component?.routerView?.loadRoute(toRoute);
        } else if (
          fromRoute?.parent?.routerView?.component &&
          fromRoute?.parent?.routerView?.component?.className ===
            toRoute?.parent?.routerView?.component?.className
        ) {
          fromRoute?.routerView?.loadRoute(toRoute);
        } else {
          loadRoute(toRoute);
        }
      } else {
        // 加载对应的路由组件，此操作通常包括异步获取组件代码并执行。
        loadRoute(toRoute);
      }
    } else {
      // 如果找不到匹配的路由配置，则发出警告，并抛出一个错误。
      console.warn('No matching route found for', to);
      throw Error('route is undefined . ');
    }
  }

  /**
   * 导航到指定的路径。
   *
   * 此函数负责根据提供的路径进行页面导航。它支持两种导航模式：'hash' 和非 'hash' 模式。
   * 在 'hash' 模式下，它使用 URL 的 hash 属性进行导航；在非 'hash' 模式下，它利用浏览器的 history API 实现导航。
   *
   * @param {string} to - 需要导航到的路径。路径必须是字符串且非空。
   */
  push(to: string) {
    // 输出导航路径供调试使用
    console.log('navigateTo path is ', to);

    // 检查路径是否为字符串类型且非空，若不满足条件，则打印错误信息并返回
    if (typeof to !== 'string' || to.trim() === '') {
      console.error('Invalid path provided for navigation.');
      return;
    }
    // 根据当前的导航模式，选择相应的导航方法
    if (this.mode === 'hash') {
      // 在 'hash' 模式下，通过修改 URL 的 hash 属性进行导航
      window.location.hash = '#' + to;
    } else {
      const from = window.location.pathname;
      // 更新lastPath以跟踪最新的导航状态
      this.lastPath = { from, to };
      // 在非 'hash' 模式下，使用 history API 的 pushState 方法进行导航
      window.history.pushState(this.lastPath, '', to);
      // 调用处理路由变化的函数，以便根据新的路径执行相应的逻辑
      this.handleRouteChange(to, from);
    }
  }

  replace(to: string) {
    // 输出导航路径供调试使用
    console.log('navigateTo path is ', to);

    // 检查路径是否为字符串类型且非空，若不满足条件，则打印错误信息并返回
    if (typeof to !== 'string' || to.trim() === '') {
      console.error('Invalid path provided for navigation.');
      return;
    }
    // 根据当前的导航模式，选择相应的导航方法
    if (this.mode === 'hash') {
      // 在 'hash' 模式下，通过修改 URL 的 hash 属性进行导航
      // todo 实现replace功能
      window.location.hash = '#' + to;
    } else {
      const from = window.location.pathname;
      // 更新lastPath以跟踪最新的导航状态
      this.lastPath = { from, to };
      // 在非 'hash' 模式下，使用 history API 的 pushState 方法进行导航
      window.history.replaceState(this.lastPath, '', to);
      // 调用处理路由变化的函数，以便根据新的路径执行相应的逻辑
      this.handleRouteChange(to, from, 'replace');
    }
  }
}
