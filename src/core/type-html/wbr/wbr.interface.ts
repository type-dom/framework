import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeWbr extends ITypeHtml {
  props: ITypeWbrConfig;
}

export interface ITypeWbrConfig extends ITypeHtmlConfig {
  nodeName?: 'wbr';
}
