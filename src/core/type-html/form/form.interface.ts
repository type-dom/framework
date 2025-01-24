import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeForm extends ITypeHtml {
  props: ITypeFormConfig;
}

export interface ITypeFormConfig extends ITypeHtmlConfig {
  nodeName?: 'form';
}
