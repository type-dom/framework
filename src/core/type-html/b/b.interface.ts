import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeB extends ITypeHtml {
  props: ITypeBConfig;
}

export interface ITypeBConfig extends ITypeHtmlConfig {
  nodeName?: 'b';
}
