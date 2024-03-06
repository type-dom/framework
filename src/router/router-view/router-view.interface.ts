import { ITypeConfig } from '../../config.interface';
import { TypeElement } from '../../type-element/type-element.abstract';

export interface IRouterViewConfig extends ITypeConfig {
  parent: TypeElement;
  nodeName: string;
  name: string;
  height: string; // default 60px
}
