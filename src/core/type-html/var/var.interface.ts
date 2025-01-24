import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeVar extends ITypeHtml {
  props: ITypeVarConfig;
}

export interface ITypeVarConfig extends ITypeHtmlConfig {
  nodeName?: 'var';
}
