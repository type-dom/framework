import { TypeArticle } from '../../../../core/components/type-html/article/article.abstract';
import { ArticleProps } from '../../../../core/components/type-html/article/article.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IArticle } from './article.interface';

export class Article extends TypeArticle implements IArticle {
  className: 'Article';

  override isBasic = true;

  constructor(params: ArticleProps = {}) {
    super(params);
    this.className = 'Article';
    transformSlot(this, params.slot);
  }
}
