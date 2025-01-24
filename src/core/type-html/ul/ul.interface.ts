import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';
import type { ITypeLI } from '../li/li.interface';

export interface ITypeUL extends ITypeHtml {
  props: ITypeULConfig;
  childNodes: ITypeLI[];
}

export interface ITypeULConfig extends ITypeHtmlConfig {
  nodeName?: 'ul';
}
