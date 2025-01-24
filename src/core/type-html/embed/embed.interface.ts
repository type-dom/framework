import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeEmbed extends ITypeHtml {
  props: ITypeEmbedConfig;
}

export interface ITypeEmbedConfig extends ITypeHtmlConfig {
  nodeName?: 'embed';
}
