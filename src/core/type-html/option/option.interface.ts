import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeOption extends ITypeHtml {
  props: ITypeOptionConfig;
}

export interface ITypeOptionConfig extends ITypeHtmlConfig {
  nodeName?: 'option';
}
