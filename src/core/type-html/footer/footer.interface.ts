import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeFooter extends ITypeHtml {
  props: ITypeFooterConfig;
}

export interface ITypeFooterConfig extends ITypeHtmlConfig {
  nodeName?: 'footer';
}
