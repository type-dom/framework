import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeMain extends ITypeHtml {
  props: ITypeMainConfig;
}

export interface ITypeMainConfig extends ITypeHtmlConfig {
  nodeName?: 'main';
}
