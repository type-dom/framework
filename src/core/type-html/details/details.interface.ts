import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeDetails extends ITypeHtml {
  props: ITypeDetailsConfig;
}

export interface ITypeDetailsConfig extends ITypeHtmlConfig {
  nodeName?: 'details';
}
