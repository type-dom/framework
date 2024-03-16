import { TypeHtml } from '../type-html.abstract';
import type { ITypeArticle } from './article.interface';

export abstract class TypeArticle extends TypeHtml implements ITypeArticle {
  nodeName: 'article';
  dom: HTMLElement;

  protected constructor() {
    super();
    this.nodeName = 'article';
    this.dom = document.createElement(this.nodeName);
  }
}
