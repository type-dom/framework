import { TypeHtml } from '../type-html.abstract';
import { ITypeArticle, TypeArticleProps } from './article.interface';

export abstract class TypeArticle extends TypeHtml implements ITypeArticle {
  props: TypeArticleProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'article'
    })
  }
}
