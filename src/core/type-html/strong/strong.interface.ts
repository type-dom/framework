import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeStrong extends ITypeHtml {
  props: ITypeStrongConfig;
}

export interface ITypeStrongConfig extends ITypeHtmlConfig {
  nodeName?: 'strong';
}
