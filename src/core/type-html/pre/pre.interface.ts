import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypePre extends ITypeHtml {
  props: ITypePreConfig;
}

export interface ITypePreConfig extends ITypeHtmlConfig {
  nodeName?: 'pre';
}
