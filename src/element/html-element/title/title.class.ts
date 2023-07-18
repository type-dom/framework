import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeTitle } from '../../../type-element/type-html/title/title.abstract';
import { XElement } from '../../../x-element/x-element.class';
import { ITitle } from './title.interface';
export class Title extends TypeTitle implements ITitle {
  className: 'Title';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Title';
  }
}
