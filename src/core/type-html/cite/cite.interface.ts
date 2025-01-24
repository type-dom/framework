import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeCite extends ITypeHtml {
  props: ITypeCiteConfig;
}

export interface ITypeCiteConfig extends ITypeHtmlConfig {
  nodeName?: 'cite';
}
