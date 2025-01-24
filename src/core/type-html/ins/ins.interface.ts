import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeIns extends ITypeHtml {
  props: ITypeInsConfig;
}

export interface ITypeInsConfig extends ITypeHtmlConfig {
  nodeName?: 'ins';
}
