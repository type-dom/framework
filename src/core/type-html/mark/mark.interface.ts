import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeMark extends ITypeHtml {
  props: ITypeMarkConfig;
}

export interface ITypeMarkConfig extends ITypeHtmlConfig {
  nodeName?: 'mark';
}
