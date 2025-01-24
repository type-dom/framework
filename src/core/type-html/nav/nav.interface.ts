import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeNav extends ITypeHtml {
  props: ITypeNavConfig;
}

export interface ITypeNavConfig extends ITypeHtmlConfig {
  nodeName?: 'nav';
}
