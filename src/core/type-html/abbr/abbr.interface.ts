import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeAbbr extends ITypeHtml {
  props: ITypeAbbrConfig;
}

export interface ITypeAbbrConfig extends ITypeHtmlConfig {
  nodeName?: 'abbr';
}
