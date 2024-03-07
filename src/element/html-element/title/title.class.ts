import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeTitle } from '../../../type-element/type-html/title/title.abstract';
import type { ITitle } from './title.interface';

export class Title extends TypeTitle implements ITitle {
  className: 'Title';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Title';
  }
}
