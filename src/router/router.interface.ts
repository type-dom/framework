import { IRoute } from './route.interface';
import { TypeElement } from '../core';

export interface IRouter {
  // 路由根节点
  root?: TypeElement;
  // 路由列表
  routes: IRoute[];

  init(root: TypeElement): void;
}

export interface IRouterOption {
  routes: IRoute[];
  history?: boolean; // 是否history模式；hash模式
}
