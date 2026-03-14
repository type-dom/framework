import type { ITypeHtml, HtmlProps } from '../type-html.interface';
import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute';

export interface ITypeArticle extends ITypeHtml {
  props: ArticleProps;
}
export interface ArticleProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['article'];
}
