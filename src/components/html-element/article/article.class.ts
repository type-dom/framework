import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeArticle } from '../../../core/type-html/article/article.abstract';
import type { IArticle } from './article.interface';

export class Article extends TypeArticle implements IArticle {
  className: 'Article';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Article';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
