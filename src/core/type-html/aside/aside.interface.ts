import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeAside extends ITypeHtml {
  props: ITypeAsideConfig;
}

export interface ITypeAsideConfig extends ITypeHtmlConfig {
  nodeName?: 'aside';
}
