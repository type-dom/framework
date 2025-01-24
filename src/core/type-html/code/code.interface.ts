import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeCode extends ITypeHtml {
  props: ITypeCodeConfig;
}

export interface ITypeCodeConfig extends ITypeHtmlConfig {
  nodeName?: 'code';
}
