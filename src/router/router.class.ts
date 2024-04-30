import { debounceTime, catchError, throwError } from 'rxjs';
import { TypeElement } from '../core/type-element/type-element.abstract';
import { currentRoute$, handleRouteChange } from './index';
import type { IRoute } from './route.interface';
import type { IRouterOption, IRouter } from './router.interface';

/**
 * 创建一个路由器类
 */
export class Router implements IRouter {
  root?: TypeElement;
  routes: IRoute[];

  constructor(option: IRouterOption) {
    this.routes = option.routes;
  }

  /**
   * router的根不一定是 TypeRoot, 也可以是某个页面
   * @param root 根路由挂载的对象
   */
  init(root: TypeElement) {
    this.root = root;
    this.formatRoutes();
    console.log('this.routes is ', this.routes);
    console.log('currentRoute$ is ', currentRoute$);
    currentRoute$
      .pipe(
        debounceTime(100),
        catchError((error) => {
          console.error('Error during route change:', error);
          return throwError(error); // 此处需要import { throwError } from 'rxjs';
        }),
      ) // 防抖处理
      .subscribe((path) => {
        console.log('init component path is ', path);
        // 根据路由定位到对应的component（组件）
        const route = this.findMatchingRoute(path);
        if (route) {
          // if (route.hidden) { // hidden 只是控制菜单的显示，不控制组件的显示。
          //   return;
          // }
          if (route?.redirect) {
            // console.log('route.redirect is ', route.redirect);
            this.navigateTo(route.redirect);
            return;
          }
          this.loadRoute(route);
          // route.component.parent?.render(); // 递归渲染父级
        } else {
          console.warn('No matching route found for', path);
          throw Error('route is undefined . ');
        }
      });
  }

  /**
   * 处理嵌套子路由刷新问题
   * 否则，嵌套子路由刷新，页面会为空。因为父级的routerView没有渲染。
   * 加载指定的路由。
   * @param route 路由信息对象，包含路由的组件和父路由信息。
   */
  async loadRoute(route: IRoute) {
    console.error('loadRoute . ');
    console.log('route is ', route);
    if (!route.component) {
      // 如果route.component不存在，直接返回
      throw Error('route.component is undefined . ');
    }
    if (route.upRoutes) {
        for (const upRoute of route.upRoutes) {
          // 先加载父级路由的组件
          await this.loadUpRoute(upRoute);
        }
        await this.loadUpRoute(route);
    }
    this.root?.routerView?.render();
  }

  async loadUpRoute(upRoute: IRoute): Promise<any> {
    console.log('loadUpRoute upRoute is ', upRoute);
    if (!upRoute.component) {
      // 如果route或其component不存在，直接返回
      throw Error('upRoute.component is undefined . ');
    }
    await upRoute.component().then((module) => {
      console.log('module is ', module);
      const Component = this.getClassFromModule(module);
      const component = new Component();
      console.log('component is ', component);
      // return component;
      if (component.routerView) {
        upRoute.routerView = component.routerView;
      }
      if (upRoute.parent) {
        upRoute.parent.routerView?.clearChildNodes();
        upRoute.parent.routerView?.addChild(component);
      } else {
        this.root?.routerView?.clearChildNodes();
        this.root?.routerView?.addChild(component);
      }
    });
  }

  getClassFromModule(module: any): any {
    for(const value of Object.values(module)) {
      if (
        typeof value === 'function' &&
        value.prototype !== undefined &&
        value.prototype.constructor === value
      ) {
        return value;
      } else {
        throw Error('module not has a class');
      }
    }
  }
  /**
   * 通过路由找的对应的route对象
   * @param path 路由字符串
   * @param routes
   */
  findMatchingRoute(path: string, routes: IRoute[] = this.routes): IRoute | undefined {
    path = this.formatPath(path);
    for (const route of routes) {
      if (route.path === path) {
        return route;
      }
      if (route.children) {
        // todo 子路由的path是不是应该与父路由组合
        //    完整路径匹配   ---> 相当路径匹配
        const matchedRoute: IRoute | undefined = this.findMatchingRoute(path, route.children);
        if (matchedRoute) {
          return matchedRoute;
        }
      }
    }
    return undefined;
  }
  /**
   * 格式化给定的路径，确保它以斜杠开头，且不以斜杠结尾。
   * @param path 待格式化的路径字符串。
   * @returns 格式化后的路径字符串。
   * @throws {Error} 如果输入不是非空字符串。
   */
  formatPath(path: string): string {
    // 验证输入是否为非空字符串
    if (typeof path !== 'string') {
      throw new Error('Invalid input: path must be a non-empty string.');
    }
    if (path === '' || path === '/') {
      return path;
    }
    // 使用replace方法优化性能，避免不必要的字符串拼接
    // 同时使用常量代替硬编码的字符串'/'
    const PATH_SEPARATOR = '/';
    path = path.startsWith(PATH_SEPARATOR) ? path : PATH_SEPARATOR + path;
    if (path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    return path
  }
  /**
   * 将route.component全部挂载到具体的RouterView对象上
   * @param component 必须是包含的routerView属性的组件
   * @param routes
   */
  formatRoutes(routes = this.routes) {
    console.error('formatRoutes . ');
    routes.forEach((route: IRoute) => {
      // if (component.routerView) {
      //   route.component.parent = component.routerView;
      // } else {
      //   console.warn('parent.routerView is undefined . ');
      // }
      if (route.upRoutes === undefined) {
        route.upRoutes = [];
      }
      if (route.parent) {
        route.upRoutes.push(route.parent);
      }
      if (route.children) {
        route.children.forEach((child) => {
          child.parent = route;
          if (route.upRoutes) {
            if (child.upRoutes === undefined) {
              child.upRoutes = [];
            }
            child.upRoutes?.push(...route.upRoutes);
          }
        });
        this.formatRoutes(route.children);
      }
    });
  }

  navigateTo(path: string) {
    console.log('navigateTo path is ', path);
    if (typeof path !== 'string' || path.trim() === '') {
      console.error('Invalid path provided for navigation.');
      return;
    }
    window.history.pushState(null, '', path);
    handleRouteChange();
  }
}
