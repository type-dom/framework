import { ITypeHtml } from '../type-element/type-html/type-html.interface';
import { ITypeConfig } from '../type-node/type-node.interface';


export interface IRootNode extends ITypeHtml {
  el?: HTMLElement;
}

export interface IRootNodeConfig extends ITypeConfig {
  el?: HTMLElement;
}
