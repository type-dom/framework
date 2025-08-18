import { TypeArticle } from '../../../../core/components/type-html/article/article.abstract';
import { TypeArticleProps } from '../../../../core/components/type-html/article/article.interface';
import type { IArticle } from './article.interface';

export class Article extends TypeArticle implements IArticle {
  className: 'Article';

  override isBasic = true;

  constructor(params: TypeArticleProps = {}) {
    super();
    this.className = 'Article';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
