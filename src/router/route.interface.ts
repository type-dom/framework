import { TypeSvgSvg } from '../core/type-element/type-svg/svg/svg.abstract';
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
  upRoutes?: IRoute[];
  routerView?: RouterView; // 对应上一级的Component的routerView属性；
}
