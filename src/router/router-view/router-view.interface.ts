import { ITypeConfig } from '../../config.interface';
import { TypeHtml } from '../../type-element/type-html/type-html.abstract';


export interface IRouterViewConfig extends ITypeConfig {
  parent: TypeHtml;
  nodeName?: string;
  height?: string;
  childNodes?: never;
}
