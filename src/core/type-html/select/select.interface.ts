import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeSelect extends ITypeHtml {
  props: ITypeSelectConfig;
}

export interface ITypeSelectConfig extends ITypeHtmlConfig {
  nodeName?: 'select';
}
