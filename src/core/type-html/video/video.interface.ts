import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeVideo extends ITypeHtml {
  props: ITypeVideoConfig;
}

export interface ITypeVideoConfig extends ITypeHtmlConfig {
  nodeName?: 'video';
}
