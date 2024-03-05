import { IRoute } from './route.interface';

export interface IRouterOption {
  routes: IRoute[];
  history?: string; // todo
}
