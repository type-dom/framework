import { TypeArticle } from '../../../../core/abstracts/type-html/article/article.abstract';
import { ArticleProps } from '../../../../core/abstracts/type-html/article/article.interface';
import type { IArticle } from './article.interface';

export class Article extends TypeArticle implements IArticle {
  className: 'Article';
  constructor(params: ArticleProps = {}) {
    super(params);
    this.className = 'Article';
  }
}
