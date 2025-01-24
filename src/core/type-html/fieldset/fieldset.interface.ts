import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeFieldset extends ITypeHtml {
  props: ITypeFieldsetConfig;
}

export interface ITypeFieldsetConfig extends ITypeHtmlConfig {
  nodeName: 'fieldset';
}
