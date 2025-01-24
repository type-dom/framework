import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeMeter extends ITypeHtml {
  props: ITypeMeterConfig;
}

export interface ITypeMeterConfig extends ITypeHtmlConfig {
  nodeName?: 'meter';
}
