import { map, debounceTime } from 'rxjs';
import { TypeElement } from '../type-element/type-element.abstract';
import { currentRoute$, handleRouteChange, RouterView } from './index';
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
    this.mountRouterView(root);
    // console.log('this.routes is ', this.routes);
    // console.log('currentRoute$ is ', currentRoute$);
    currentRoute$
      .pipe(debounceTime(100)) // 防抖处理
      .subscribe((path) => {
        console.log('init component path is ', path);
        // 根据路由定位到对应的component（组件）
        const route = this.findMatchingRoute(path);
        if (route) {
          if (route.hidden) {
            return;
          }
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
  loadRoute(route: IRoute) {
    console.error('loadRoute . ');
    console.log('route is ', route);
    if (!route || !route.component || !route.component.parent) {
      // 如果route或其component或component's parent不存在，直接返回
      return;
    }
    // 判断路由组件的父实例是否为RouterView
    const component = route.component;
    console.log('component is ', component);
    if (component.parent instanceof RouterView) {
      // 经过 mountRouterView后，component.parent对应到具体的RouterView对象。
      // 如果是RouterView，确保当前路由组件是其唯一子节点
      if (component.parent.firstChild !== component) {
        component.parent.childNodes = [component]; // 切换路由，routerView挂载组件
      }
      if (route.parent) {
        console.log('route.parent is ', route.parent);
        // 直接刷新嵌套路由时需要先渲染上层路由
        // 如果存在父路由，则先渲染父路由
        // 递归渲染父路由
        this.loadRoute(route.parent);
      } else {
        // 当路由为最外层时，触发RouterView的渲染
        // 只在最外层routerView渲染
        component.parent.render(); // 为什么要parent。
        // component.render(); // todo 重写 RouterView的render方法 ？？
        // 注意：这里考虑是否需要重写RouterView的render方法
      }
    }
  }

  /**
   * 通过路由找的对应的route对象
   * @param path 路由字符串
   * @param routes
   */
  findMatchingRoute(path: string, routes: IRoute[] = this.routes): IRoute | undefined {
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
   * 将route.component全部挂载到具体的RouterView对象上
   * @param component 必须是包含的routerView属性的组件
   * @param routes
   */
  mountRouterView(component: TypeElement, routes = this.routes) {
    routes.forEach((route: IRoute) => {
      if (component.routerView) {
        route.component.parent = component.routerView;
      } else {
        console.warn('parent.routerView is undefined . ');
      }
      if (route.children) {
        route.children.forEach((child) => {
          child.parent = route;
        });
        this.mountRouterView(route.component, route.children);
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
