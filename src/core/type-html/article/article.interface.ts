import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeArticle extends ITypeHtml {
  props: ITypeArticleConfig;
}
export interface ITypeArticleConfig extends ITypeHtmlConfig {
  nodeName?: 'article';
}
