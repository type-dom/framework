import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeBdo extends ITypeHtml {
  props: ITypeBdoConfig;
}

export interface ITypeBdoConfig extends ITypeHtmlConfig {
  nodeName?: 'bdo';
}
