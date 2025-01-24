import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeMenuItem extends ITypeHtml {
  props: ITypeMenuItemConfig;
}

export interface ITypeMenuItemConfig extends ITypeHtmlConfig {
  nodeName: 'menuitem';
}
