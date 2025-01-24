import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeImg extends ITypeHtml {
  props: ITypeImgConfig;
  childNodes: [];
}

export interface ITypeImgConfig extends ITypeHtmlConfig {
  nodeName?: 'img';
}
