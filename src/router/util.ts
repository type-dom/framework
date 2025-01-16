import { TypeElement } from '../core/type-element/type-element.abstract';
import type { IRoute } from './route.interface';

/**
 * 格式化给定的路径，确保它以斜杠开头，且不以斜杠结尾。
 * @param path 待格式化的路径字符串。
 * @returns 格式化后的路径字符串。
 * @throws {Error} 如果输入不是非空字符串。
 */
export function formatPath(path: string): string {
  // 验证输入是否为非空字符串
  if (typeof path !== 'string') {
    throw Error('Invalid input: path must be a non-empty string.');
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
  return path;
}

/**
 * 通过路由找的对应的route对象
 * @param path 路由字符串
 * @param routes
 */
export function findMatchingRoute(
  path: string,
  routes: IRoute[]
): IRoute | undefined {
  path = formatPath(path);
  for (const route of routes) {
    if (route.path === path) {
      return route;
    }
    if (route.children) {
      // todo 子路由的path是不是应该与父路由组合
      //    完整路径匹配   ---> 相当路径匹配
      const matchedRoute: IRoute | undefined = findMatchingRoute(
        path,
        route.children
      );
      if (matchedRoute) {
        return matchedRoute;
      }
    }
  }
  return undefined;
}

/**
 * 将route.component全部挂载到具体的RouterView对象上
 * @param el 必须是包含的routerView属性的组件
 * @param routes
 */
export function formatRoutes(routes: IRoute[], el?: TypeElement) {
  // console.error('formatRoutes . ');
  routes.forEach((route: IRoute) => {
    // if (component.routerView) {
    //   route.component.parent = component.routerView;
    // } else {
    //   console.warn('parent.routerView is undefined . ');
    // }
    if (el?.routerView) {
      route.routerView = el.routerView;
    }
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
      formatRoutes(route.children);
    }
  });
}

export function getClassFromModule(module: any): any {
  for (const value of Object.values(module)) {
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
 * 处理嵌套子路由刷新问题
 * 否则，嵌套子路由刷新，页面会为空。因为父级的routerView没有渲染。
 * 加载指定的路由。
 * todo 菜单栏，在切换菜单时，不应该重载；
 *      login 和 登录后的主页面是不一样的。
 * @param route 路由信息对象，包含路由的组件和父路由信息。
 * @param root
 */
export async function loadRoute(route: IRoute) {
  // console.error('loadRoute . ');
  // console.log('route is ', route);
  if (!route.component) {
    // 如果route.component不存在，直接返回
    throw Error('route.component is undefined . ');
  }
  if (route.upRoutes) {
    for (const upRoute of route.upRoutes) {
      // 先加载父级路由的组件
      await loadUpRoute(upRoute);
    }
    await loadUpRoute(route);
    if (route.upRoutes.length > 0) {
      route.upRoutes[0].routerView?.elementParent?.mount();
    } else {
      route.routerView?.elementParent?.mount();
    }
  }
}

/**
 * 异步加载上层路由组件。
 *
 * 此函数用于根据提供的上层路由信息，动态加载对应的组件，并将其渲染到相应的路由视图中。
 * 如果上层路由有父路由，那么组件将被添加到父路由的视图中；如果没有父路由，则添加到根路由视图中。
 *
 * @param upRoute 要加载的上层路由信息，包含组件信息和路由视图信息。
 * @param root 可选的根组件类型，用于没有父路由时的路由视图定位。
 * @returns 返回一个Promise，表示组件加载和渲染的过程。
 * @throws 如果上层路由的组件未定义，则抛出错误。
 */
export async function loadUpRoute(upRoute: IRoute): Promise<void> {
  // 输出上层路由信息用于调试
  // console.log('loadUpRoute upRoute is ', upRoute);

  // 检查上层路由的组件是否定义，如果没有定义则抛出错误
  if (!upRoute.component) {
    // 如果route或其component不存在，直接返回
    throw Error('upRoute.component is undefined . ');
  }

  // 等待组件加载完毕
  await upRoute.component().then((module) => {
    // 输出模块信息用于调试
    // console.log('module is ', module);

    // 从模块中获取组件类
    const Component = getClassFromModule(module);
    // 创建组件实例
    const component = new Component();
    // 输出组件实例信息用于调试
    // console.log('component is ', component);

    // 如果组件有routerView属性，则将其赋值给上层路由的routerView属性
    if (component.routerView) {
      upRoute.children?.forEach((child) => {
        child.routerView = component.routerView;
      });
    }
    upRoute.routerView?.setComponent(component); // 必须加上，否则路由跳转时找不到。
    // 如果上层路由有父路由，则将组件添加到父路由的视图中，并清除父路由视图的子节点
    upRoute.routerView?.clearChildNodes();
    upRoute.routerView?.addChild(component);
  });
}
