import type { ITypeHtml, HtmlProps } from '../type-html.interface';
import { IntrinsicElementAttributes } from '../../attribute';

export interface ITypeArticle extends ITypeHtml {
  props: TypeArticleProps;
}
export interface TypeArticleProps extends HtmlProps {
  nodeName?: 'article';
  attrObj?: IntrinsicElementAttributes['article'];
}
