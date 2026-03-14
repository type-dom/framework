import { TypeHtml } from '../type-html.abstract';
import { ITypeArticle, ArticleProps } from './article.interface';

export abstract class TypeArticle<Props extends ArticleProps = ArticleProps> extends TypeHtml<Props> implements ITypeArticle {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('article');
  }
}
