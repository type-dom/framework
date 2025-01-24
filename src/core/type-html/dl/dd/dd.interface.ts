import type { ITypeHtml, ITypeHtmlConfig } from '../../type-html.interface';

export interface ITypeDD extends ITypeHtml {
  props: ITypeDDConfig;
}

export interface ITypeDDConfig extends ITypeHtmlConfig {
  nodeName?: 'dd';
}
