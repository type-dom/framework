import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeOutput extends ITypeHtml {
  props: ITypeOutputConfig;
}

export interface ITypeOutputConfig extends ITypeHtmlConfig {
  nodeName?: 'output';
}
