import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeSup extends ITypeHtml {
  props: ITypeSupConfig;
}

export interface ITypeSupConfig extends ITypeHtmlConfig {
  nodeName?: 'sup';
}
