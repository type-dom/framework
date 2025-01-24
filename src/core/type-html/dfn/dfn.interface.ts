import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeDfn extends ITypeHtml {
  props: ITypeDfnConfig;
}

export interface ITypeDfnConfig extends ITypeHtmlConfig {
  nodeName?: 'dfn';
}
