import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeSmall extends ITypeHtml {
  props: ITypeSmallConfig;
}

export interface ITypeSmallConfig extends ITypeHtmlConfig {
  nodeName?: 'small';
}
