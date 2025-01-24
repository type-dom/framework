import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeQ extends ITypeHtml {
  props: ITypeQConfig;
}

export interface ITypeQConfig extends ITypeHtmlConfig {
  nodeName?: 'q';
}
