import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeDL extends ITypeHtml {
  props: ITypeDLConfig;
  // childNodes: ITypeLI[]
}

export interface ITypeDLConfig extends ITypeHtmlConfig {
  nodeName?: 'dl';
}
