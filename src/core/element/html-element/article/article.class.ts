import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeArticle } from '../../../type-element/type-html/article/article.abstract';
import type { IArticle } from './article.interface';

export class Article extends TypeArticle implements IArticle {
  className: 'Article';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Article';
    this.setConfig(config);
  }
}
