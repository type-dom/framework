import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeInput extends ITypeHtml {
  props: ITypeInputConfig;
}

export interface ITypeInputConfig extends ITypeHtmlConfig {
  nodeName?: 'input';
}
