import { TypeHtml } from '../../type-element/type-html/type-html.abstract';
import { ITypeConfig } from '../../type-node/type-node.interface';

export interface IRouterViewConfig extends ITypeConfig {
  parent: TypeHtml;
  height?: string;
  childNodes?: never;
}
