import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeRuby extends ITypeHtml {
  props: ITypeRubyConfig;
}

export interface ITypeRubyConfig extends ITypeHtmlConfig {
  nodeName?: 'ruby';
}
