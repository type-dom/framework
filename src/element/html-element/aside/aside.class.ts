import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeAside } from '../../../type-element/type-html/aside/aside.abstract';
import type { IAside } from './aside.interface';

export class Aside extends TypeAside implements IAside {
  className: 'Aside';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Aside';
  }
}
