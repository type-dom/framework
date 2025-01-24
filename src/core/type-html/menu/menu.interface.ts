import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeMenu extends ITypeHtml {
  props: ITypeMenuConfig;
}

export interface ITypeMenuConfig extends ITypeHtmlConfig {
  nodeName?: 'menu';
}
