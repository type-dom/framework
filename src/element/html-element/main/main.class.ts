import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeMain } from '../../../type-element/type-html/main/main.abstract';
import type { IMain } from './main.interface';

export class Main extends TypeMain implements IMain {
  className: 'Main';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Main';
  }
}
