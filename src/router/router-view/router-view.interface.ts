import { TypeHtml } from '../../type-element/type-html/type-html.abstract';
import { ITypeConfig } from '../../config.interface';


export interface IRouterViewConfig extends ITypeConfig {
  parent: TypeHtml;
  nodeName: string;
  name: string;
  height: string; // default 60px
}
