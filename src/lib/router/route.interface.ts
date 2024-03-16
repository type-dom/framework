import { TypeElement } from '../type-element/type-element.abstract';
import { TypeSvgSvg } from '../type-element/type-svg/svg/svg.abstract';


export interface IRoute {
  name: string;
  path: string;
  component: TypeElement;
  hidden?: boolean;
  redirect?: string;
  children?: IRoute[];
  parent?: IRoute;
  svgObj?: TypeSvgSvg,
}
