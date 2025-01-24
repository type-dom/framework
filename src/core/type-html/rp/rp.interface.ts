import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeRp extends ITypeHtml {
  props: ITypeRpConfig;
}

export interface ITypeRpConfig extends ITypeHtmlConfig {
  nodeName?: 'rp';
}
