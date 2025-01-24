import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeLI extends ITypeHtml {
  props: ITypeLIConfig;
}

export interface ITypeLIConfig extends ITypeHtmlConfig {
  nodeName?: 'li';
}
