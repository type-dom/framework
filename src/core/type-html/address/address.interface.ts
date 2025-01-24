import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeAddress extends ITypeHtml {
  props: ITypeAddressConfig;
}
export interface ITypeAddressConfig extends ITypeHtmlConfig {
  nodeName?: 'address';
}
