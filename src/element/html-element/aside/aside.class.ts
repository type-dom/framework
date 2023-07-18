import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { XElement } from '../../../x-element/x-element.class';
import { TypeAside } from '../../../type-element/type-html/aside/aside.abstract';
import { IAside } from './aside.interface';
export class Aside extends TypeAside implements IAside {
  className: 'Aside';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Aside';
  }
}
