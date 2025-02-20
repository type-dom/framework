import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeArticle } from '../../../core/type-html/article/article.abstract';
import type { IArticle } from './article.interface';

export class Article extends TypeArticle implements IArticle {
  className: 'Article';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Article';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
