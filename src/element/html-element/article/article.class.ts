import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { XElement } from '../../x-element/x-element.class';
import { TypeArticle } from '../../../type-element/type-html/article/article.abstract';
import { IArticle } from './article.interface';
export class Article extends TypeArticle implements IArticle {
  className: 'Article';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Article';
  }
}
