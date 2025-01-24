import { TypeHtml } from '../type-html.abstract';
import { ITypeArticle, ITypeArticleConfig } from './article.interface';

export abstract class TypeArticle extends TypeHtml implements ITypeArticle {
  props: ITypeArticleConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'article'
    })
  }
}
