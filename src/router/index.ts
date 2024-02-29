import { BehaviorSubject } from 'rxjs';
export { Router } from './router.class';
export type { IRouterOption } from './router.interface';
export { RouterView } from './router-view';
export type { IRoute } from './route.interface';
// 创建一个可观察的路由状态
export const currentRoute$ = new BehaviorSubject(window.location.pathname);

// 创建一个函数来处理路由变化
export function handleRouteChange() {
  const path = window.location.pathname;
  console.log('handleRouteChange . path is ', path);
  currentRoute$.next(path);
}

// 监听路由变化事件
window.addEventListener('popstate', handleRouteChange);
