import { TypeSvgSvg } from '../core/type-svg/svg/svg.abstract';
// import { IRouterView } from './router-view/router-view.interface';
import { RouterView } from './router-view/router-view.class';

export interface IRoute {
  name: string;
  path: string;
  component?: () => Promise<any>;
  hidden?: boolean;
  redirect?: string;
  children?: IRoute[];
  parent?: IRoute;
  svgObj?: TypeSvgSvg;
  upRoutes?: IRoute[]; // 上级路由 路径数组
  routerView?: RouterView; // 对应上一级的Component的routerView属性；
}
