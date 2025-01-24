import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeSub extends ITypeHtml {
  props: ITypeSubConfig;
}

export interface ITypeSubConfig extends ITypeHtmlConfig {
  nodeName?: 'sub';
}
