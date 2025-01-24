import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeSource extends ITypeHtml {
  props: ITypeSourceConfig;
}

export interface ITypeSourceConfig extends ITypeHtmlConfig {
  nodeName?: 'source';
}
