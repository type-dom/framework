import { TypeElement } from '../type-element/type-element.abstract';

export interface IRoute {
  name: string;
  path: string;
  component: TypeElement;
  hidden?: boolean;
  redirect?: string;
  children?: IRoute[];
  parent?: IRoute;
  svg?: any; // TypeSvgSvg,
}
