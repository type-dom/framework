import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeArticle extends ITypeHtml {
  props: TypeArticleProps;
}
export interface TypeArticleProps extends HtmlProps {
  nodeName?: 'article';
}
