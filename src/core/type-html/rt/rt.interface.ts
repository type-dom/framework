import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeRt extends ITypeHtml {
  props: ITypeRtConfig;
}

export interface ITypeRtConfig extends ITypeHtmlConfig {
  nodeName?: 'rt';
}
