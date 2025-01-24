import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeHGroup extends ITypeHtml {
  props: ITypeHGroupConfig;
}

export interface ITypeHGroupConfig extends ITypeHtmlConfig {
  nodeName?: 'hgroup';
}
