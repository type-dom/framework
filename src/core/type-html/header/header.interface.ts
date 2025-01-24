import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeHeader extends ITypeHtml {
  props: ITypeHeaderConfig;
}

export interface ITypeHeaderConfig extends ITypeHtmlConfig {
  nodeName?: 'header';
}
