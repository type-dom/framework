import { TypeHtml } from '../../core/type-element/type-html/type-html.abstract';
import { ITypeConfig } from '../../core/type-node/type-node.interface';

export interface IRouterViewConfig extends ITypeConfig {
  parent: TypeHtml;
  height?: string;
  childNodes?: never;
}
