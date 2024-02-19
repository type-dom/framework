import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeMain } from '../../../type-element/type-html/main/main.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IMain } from './main.interface';
export class Main extends TypeMain implements IMain {
  className: 'Main';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Main';
  }
}
