import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeDiv extends ITypeHtml {
  props: ITypeDivConfig;
}

export interface ITypeDivConfig extends ITypeHtmlConfig {
  nodeName?: 'div';
}
